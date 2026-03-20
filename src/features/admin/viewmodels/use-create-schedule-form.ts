import { useEffect } from 'react';

import { useNavigate } from '@tanstack/react-router';

import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { range, uniq } from 'es-toolkit';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { z } from 'zod';

import { Gender, Season } from '../models';
import { useCreateMoveOutSchedule } from './queries';

const defaultGenderFloor = Object.fromEntries(
  'GIST'
    .split('')
    .flatMap((i) => [
      ...range(i === 'S' ? 2 : 1, 5).map((j) => [`${i}${j}`, Gender.MALE]),
      ...range(5, 7).map((j) => [`${i}${j}`, Gender.FEMALE]),
    ]),
);

const schema = z.object({
  title: z.string().min(1),
  applicationStartTime: z.coerce.date<string>(),
  inspectionStartWeek: z.coerce.date<string>(),
  currentSemesterFile: z.instanceof(FileList).refine((files) => files.length === 1),
  nextSemesterFile: z.instanceof(FileList).refine((files) => files.length === 1),
  inspectionTimeRange: z.array(z.string()).min(1),
  residentGenderByHouseFloorKey: z.record(z.string(), z.enum(Gender)),
});

type Semester = 'spring' | 'summer' | 'fall' | 'winter';
type YearSemester = { year: number; semester: Semester };

const getYearSemester = (date: string | Date | dayjs.Dayjs): YearSemester => {
  const d = dayjs(date);
  const year = d.subtract(3, 'month').year();
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

const getInspectionTimes = (date: string | Date | dayjs.Dayjs): dayjs.Dayjs[] => {
  // sunday
  const startOfWeek = dayjs(date).startOf('d').set('day', 0);
  const { semester } = getYearSemester(date);
  const isSmall = semester === 'winter' || semester === 'summer';

  const createSlot = (dayOffset: number, startHour: number, endHour: number) =>
    range(startHour, Math.ceil(endHour))
      .flatMap((v) => [v, v + 0.25, v + 0.5, v + 0.75])
      .filter((v) => v < endHour)
      .map((v) => startOfWeek.day(dayOffset).add(v * 60, 'minute'));

  const schedules = [
    ...(isSmall ? [] : createSlot(4, 15, 18)),
    ...createSlot(5, 15, 18),
    ...createSlot(6, 10, 12),
    ...createSlot(6, 13, 18),
    ...createSlot(7, 10, 12),
    ...createSlot(7, 13, 16.5),
    ...(isSmall ? createSlot(7, 16.5, 18) : []),
  ];

  return schedules;
};

export const useCreateScheduleForm = () => {
  const { register, formState, handleSubmit, control, setValue } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { residentGenderByHouseFloorKey: defaultGenderFloor },
  });
  const { mutateAsync: create } = useCreateMoveOutSchedule();
  const { t } = useTranslation('admin');
  const inspectionStartWeek = useWatch({ control, name: 'inspectionStartWeek' });
  const inspectionTimeRange = useWatch({ control, name: 'inspectionTimeRange' });
  const residentGenderByHouseFloorKey = useWatch({
    control,
    name: 'residentGenderByHouseFloorKey',
  });
  const navigate = useNavigate();

  const yearSemester = inspectionStartWeek ? getYearSemester(inspectionStartWeek) : undefined;
  const inspectionTemplates = inspectionStartWeek
    ? range(1, 8)
        .map((d) => dayjs(inspectionStartWeek).startOf('day').day(d))
        .flatMap((d) =>
          range(10, 18)
            .map((i) => d.hour(i))
            .flatMap((i) => [i, i.add(15, 'm'), i.add(30, 'm'), i.add(45, 'm')]),
        )
    : undefined;

  useEffect(() => {
    if (inspectionStartWeek) {
      setValue(
        'inspectionTimeRange',
        getInspectionTimes(inspectionStartWeek).map((d) => d.toISOString()),
      );
    }
  }, [inspectionStartWeek, setValue]);

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
              currentSemesterFile: form.currentSemesterFile[0],
              nextSemesterFile: form.nextSemesterFile[0],
              residentGenderByHouseFloorKey: form.residentGenderByHouseFloorKey,
              applicationStartTime: form.applicationStartTime.toISOString(),
              applicationEndTime: form.inspectionTimeRange.sort().at(-1)!,
              title: form.title,
              inspectionTimeRange: form.inspectionTimeRange.map((d) => ({
                start: d,
                end: dayjs(d).add(15, 'minute').toISOString(),
              })),
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

  const toggleTimeRange = (uuid: string, enable: boolean) => {
    if (enable) {
      setValue('inspectionTimeRange', uniq([...(inspectionTimeRange ?? []), uuid]));
    } else {
      setValue(
        'inspectionTimeRange',
        (inspectionTimeRange ?? []).filter((v) => v !== uuid),
      );
    }
  };

  const toggleResidentGenderByHouseFloorKey = (houseFloorKey: string) => {
    const current = residentGenderByHouseFloorKey?.[houseFloorKey] ?? Gender.MALE;
    const next = current === Gender.MALE ? Gender.FEMALE : Gender.MALE;
    setValue(
      'residentGenderByHouseFloorKey',
      { ...(residentGenderByHouseFloorKey ?? {}), [houseFloorKey]: next },
      { shouldDirty: true },
    );
  };

  return {
    register,
    isValid: formState.isValid,
    onSubmit,
    yearSemester,
    isSubmitting: formState.isSubmitting,
    errors: formState.errors,
    inspectionTemplates,
    inspectionTimeRange,
    toggleTimeRange,
    residentGenderByHouseFloorKey,
    toggleResidentGenderByHouseFloorKey,
  };
};
