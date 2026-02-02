import { useMemo } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { useForm, useWatch } from 'react-hook-form';
import z from 'zod';

import { useApplyInspection } from './queries/use-apply-inspection';
import { useFindActiveMoveOutScheduleWithSlots } from './queries/use-find-active-move-out-schedule-with-slots';

const applicationFormSchema = z
  .object({
    inspectionDayTimestamp: z.number().nullable(),
    inspectionSlotUuid: z.string().nullable(),
  })
  .refine((data) => data.inspectionDayTimestamp != null && data.inspectionSlotUuid != null);

export type ApplicationFormValues = z.infer<typeof applicationFormSchema>;

export type UseApplicationFormOptions = {
  onSuccess: () => void;
  onFull: () => void;
  onNotTarget: () => void;
};

export const useApplicationForm = ({
  onSuccess,
  onFull,
  onNotTarget,
}: UseApplicationFormOptions) => {
  const {
    applicationStartTime,
    applicationEndTime,
    inspectionDays,
    inspectionSlotsByDayTimestamp,
    isLoading,
    isNotFound,
  } = useFindActiveMoveOutScheduleWithSlots();
  const { mutateAsync: applyInspection } = useApplyInspection();

  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: {
      inspectionDayTimestamp: null,
      inspectionSlotUuid: null,
    },
    mode: 'onChange',
  });

  const inspectionDayTimestamp = useWatch({
    control: form.control,
    name: 'inspectionDayTimestamp',
  });

  const selectedDaySlots = useMemo(
    () =>
      inspectionDayTimestamp != null
        ? (inspectionSlotsByDayTimestamp[inspectionDayTimestamp] ?? [])
        : [],
    [inspectionDayTimestamp, inspectionSlotsByDayTimestamp],
  );

  const isApplicationPeriod = useMemo(
    () =>
      applicationStartTime != null &&
      applicationEndTime != null &&
      dayjs().isAfter(applicationStartTime) &&
      dayjs().isBefore(applicationEndTime),
    [applicationStartTime, applicationEndTime],
  );

  const onSubmit = form.handleSubmit(async (data) => {
    if (data.inspectionSlotUuid == null) return;

    // NOTE: applicationUuid를 리턴하는데 아직 쓰는 곳이 없음.
    await applyInspection({
      body: { inspectionSlotUuid: data.inspectionSlotUuid },
    })
      .then(() => {
        onSuccess?.();
      })
      .catch((err) => {
        if (err?.statusCode === 404) {
          onNotTarget?.();
        } else if (err?.statusCode === 409) {
          onFull?.();
        }
      });
  });

  return {
    form,
    applicationStartTime,
    applicationEndTime,
    inspectionDays,
    isApplicationPeriod,
    isLoading,
    isNotFound,
    selectedDaySlots,
    inspectionDayTimestamp,
    onSubmit,
  };
};
