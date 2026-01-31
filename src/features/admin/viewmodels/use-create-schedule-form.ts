import { useNavigate } from '@tanstack/react-router';

import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import z from 'zod';

import { useCompareSheets, useCreateMoveOutSchedule } from './queries';
import { Season } from '../models';

const schema = z.object({
  title: z.string().min(1),
  applicationStartTime: z.coerce.date<string>(),
  inspectionStartWeek: z.coerce.date<string>(),
  file: z.instanceof(FileList),
});

type Semester = 'spring' | 'summer' | 'fall' | 'winter';
type YearSemester = { year: number; semester: Semester };

const getYearSemester = (date: string | Date | dayjs.Dayjs): YearSemester => {
  const d = dayjs(date);
  const year = d.subtract(2, 'month').year();
  const semester = (['winter', 'spring', 'summer', 'fall'] as const)[Math.floor(d.month() / 3)];
  return { year, semester };
};

const getNextSemester = ({ year, semester }: ReturnType<typeof getYearSemester>): YearSemester => {
  if (semester === 'winter') {
    return { year: year + 1, semester: 'spring' as const };
  }
  return {
    year,
    semester: ({ spring: 'summer', summer: 'fall', fall: 'winter' } as const)[semester],
  };
};

const getInspectionTimes = (
  date: string | Date | dayjs.Dayjs,
): { start: string; end: string }[] => {
  // sunday
  const startOfWeek = dayjs(date).startOf('w');
  const { semester } = getYearSemester(date);
  const isSmall = semester === 'winter' || semester === 'summer';
  const thu = startOfWeek.add(4, 'day');
  const fri = startOfWeek.add(5, 'day');
  const sat = startOfWeek.add(6, 'day');
  const sun = startOfWeek.add(7, 'day');

  const schedules = [
    ...(isSmall
      ? []
      : [
          thu.set('hour', 15).set('minute', 0),
          thu.set('hour', 15).set('minute', 30),
          thu.set('hour', 16).set('minute', 0),
          thu.set('hour', 16).set('minute', 30),
          thu.set('hour', 17).set('minute', 0),
          thu.set('hour', 17).set('minute', 30),
        ]),

    fri.set('hour', 15).set('minute', 0),
    fri.set('hour', 15).set('minute', 30),
    fri.set('hour', 16).set('minute', 0),
    fri.set('hour', 16).set('minute', 30),
    fri.set('hour', 17).set('minute', 0),
    fri.set('hour', 17).set('minute', 30),

    sat.set('hour', 10).set('minute', 0),
    sat.set('hour', 10).set('minute', 30),
    sat.set('hour', 11).set('minute', 0),
    sat.set('hour', 11).set('minute', 30),
    sat.set('hour', 13).set('minute', 0),
    sat.set('hour', 13).set('minute', 30),
    sat.set('hour', 14).set('minute', 0),
    sat.set('hour', 14).set('minute', 30),
    sat.set('hour', 15).set('minute', 0),
    sat.set('hour', 15).set('minute', 30),
    sat.set('hour', 16).set('minute', 0),
    sat.set('hour', 16).set('minute', 30),
    sat.set('hour', 17).set('minute', 0),
    sat.set('hour', 17).set('minute', 30),

    sun.set('hour', 10).set('minute', 0),
    sun.set('hour', 10).set('minute', 30),
    sun.set('hour', 11).set('minute', 0),
    sun.set('hour', 11).set('minute', 30),
    sun.set('hour', 13).set('minute', 0),
    sun.set('hour', 13).set('minute', 30),
    sun.set('hour', 14).set('minute', 0),
    sun.set('hour', 14).set('minute', 30),
    sun.set('hour', 15).set('minute', 0),
    sun.set('hour', 15).set('minute', 30),
    sun.set('hour', 16).set('minute', 0),

    ...(isSmall
      ? [
          sun.set('hour', 16).set('minute', 30),
          sun.set('hour', 17).set('minute', 0),
          sun.set('hour', 17).set('minute', 30),
        ]
      : []),
  ];
  return schedules.map((d) => ({
    start: d.format(),
    end: d.add(30, 'minute').format(),
  }));
};

export const useCreateScheduleForm = () => {
  const { register, formState, handleSubmit, control } = useForm({
    resolver: zodResolver(schema),
  });
  const { mutateAsync: create } = useCreateMoveOutSchedule();
  const { mutateAsync: compareSheets } = useCompareSheets();
  const { t } = useTranslation('admin');
  const applicationStartTime = useWatch({ control, name: 'applicationStartTime' });
  const inspectionStartWeek = useWatch({ control, name: 'inspectionStartWeek' });

  const yearSemester = applicationStartTime ? getYearSemester(applicationStartTime) : undefined;
  const inspectionTimeRange = inspectionStartWeek ? getInspectionTimes(inspectionStartWeek) : [];

  const navigate = useNavigate();

  const onSubmit = handleSubmit(
    async (form) => {
      if (!yearSemester) throw TypeError('year semester assertion');
      const nextSemester = getNextSemester(yearSemester);

      const semester = {
        currentYear: yearSemester.year,
        currentSeason: Season[yearSemester.semester.toUpperCase() as Uppercase<Semester>],
        nextYear: nextSemester.year,
        nextSeason: Season[nextSemester.semester.toUpperCase() as Uppercase<Semester>],
      };

      await toast
        .promise(compareSheets({ body: { ...semester, file: form.file[0] } }), {
          loading: t('schedule.create.excel.uploading'),
          success: (result) => t('schedule.create.excel.count', { count: result.count }),
          error: t('schedule.create.excel.error'),
        })
        .unwrap();
      const result = await toast
        .promise(
          create({
            body: {
              ...semester,
              applicationStartTime,
              applicationEndTime: dayjs(inspectionStartWeek).endOf('week').format(),
              title: form.title,
              inspectionTimeRange,
            },
          }),
          {
            loading: t('schedule.create.loading'),
            success: (result) => t('schedule.create.succeed', { id: result.id }),
            error: t('schedule.create.error.creating'),
          },
        )
        .unwrap();
      navigate({ to: '/admin/schedules/$id', params: { id: result.id.toString() } });
    },
    () => {
      toast.error(t('schedule.create.error.formError'));
    },
  );

  return {
    register,
    isValid: formState.isValid,
    onSubmit,
    // t('schedule.create.summary.semester.spring')
    // t('schedule.create.summary.semester.summer')
    // t('schedule.create.summary.semester.fall')
    // t('schedule.create.summary.semester.winter')
    semester: yearSemester
      ? `${yearSemester.year} ${t(`schedule.create.summary.semester.${yearSemester.semester}`)}`
      : undefined,
    isSubmitting: formState.isSubmitting,
    inspectionTimeRange,
  };
};
