import { useNavigate } from '@tanstack/react-router';

import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { last } from 'es-toolkit/array';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { z } from 'zod';

import { useCreateMoveOutSchedule } from './queries';
import { Season } from '../models';

const schema = z.object({
  title: z.string().min(1),
  applicationStartTime: z.coerce.date<string>(),
  inspectionStartWeek: z.coerce.date<string>(),
  file: z.instanceof(FileList).refine((files) => files.length > 0),
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
  const startOfWeek = dayjs(date).startOf('d').set('day', 0);
  const { semester } = getYearSemester(date);
  const isSmall = semester === 'winter' || semester === 'summer';

  const createSlot = (dayOffset: number, startHour: number, endHour: number) =>
    [...Array((endHour - startHour) * 2)].map((_, v) =>
      startOfWeek
        .set('day', dayOffset)
        .add(startHour, 'h')
        .add(v * 30, 'minute'),
    );

  const schedules = [
    ...(isSmall ? [] : createSlot(4, 15, 18)),
    ...createSlot(5, 15, 18),
    ...createSlot(6, 10, 12),
    ...createSlot(6, 13, 18),
    ...createSlot(7, 10, 12),
    ...createSlot(7, 13, 16.5),
    ...(isSmall ? createSlot(7, 16.5, 18) : []),
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
  const { t } = useTranslation('admin');
  const applicationStartTime = useWatch({ control, name: 'applicationStartTime' });
  const inspectionStartWeek = useWatch({ control, name: 'inspectionStartWeek' });
  const navigate = useNavigate();

  const yearSemester = applicationStartTime ? getYearSemester(applicationStartTime) : undefined;
  const inspectionTimeRange = inspectionStartWeek ? getInspectionTimes(inspectionStartWeek) : [];

  const onSubmit = handleSubmit(
    async (form) => {
      if (!yearSemester) throw new TypeError('year semester assertion');
      const nextSemester = getNextSemester(yearSemester);

      const result = await toast
        .promise(
          create({
            body: {
              currentYear: yearSemester.year,
              currentSeason: Season[yearSemester.semester.toUpperCase()],
              nextYear: nextSemester.year,
              nextSeason: Season[nextSemester.semester.toUpperCase()],
              file: form.file[0],
              applicationStartTime,
              applicationEndTime: last(inspectionTimeRange)!.start,
              title: form.title,
              inspectionTimeRange,
            },
          }),
          {
            loading: t('schedule.create.loading'),
            success: (result) => t('schedule.create.succeed', { uuid: result.uuid }),
          },
        )
        .unwrap();
      navigate({ to: '/admin/schedules/$uuid', params: { uuid: result.uuid } });
    },
    () => {
      toast.error(t('schedule.create.error.formError'));
    },
  );

  return {
    register,
    isValid: formState.isValid,
    onSubmit,
    yearSemester,
    isSubmitting: formState.isSubmitting,
    inspectionTimeRange,
    errors: formState.errors,
  };
};
