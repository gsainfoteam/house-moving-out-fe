import { useMemo } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
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

export const useApplicationForm = ({
  onSuccess,
  onFull,
}: Parameters<typeof useApplyInspection>[0]) => {
  const {
    applicationStartTime,
    applicationEndTime,
    inspectionDays,
    inspectionSlotsByDayTimestamp,
    isLoading,
    isError,
  } = useFindActiveMoveOutScheduleWithSlots({});
  const { mutate: applyInspection } = useApplyInspection({ onSuccess, onFull });

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
      inspectionDayTimestamp != null ? inspectionSlotsByDayTimestamp[inspectionDayTimestamp] : [],
    [inspectionDayTimestamp, inspectionSlotsByDayTimestamp],
  );

  const onSubmit = form.handleSubmit((data) => {
    if (data.inspectionSlotUuid == null) return;

    // NOTE: applicationUuid를 onSuccess에서 리턴하는데 아직 쓰는 곳이 없음.
    applyInspection({
      body: { inspectionSlotUuid: data.inspectionSlotUuid },
    });
  });

  return {
    form,
    applicationStartTime,
    applicationEndTime,
    inspectionDays,
    isLoading,
    isError,
    selectedDaySlots,
    inspectionDayTimestamp,
    onSubmit,
  };
};
