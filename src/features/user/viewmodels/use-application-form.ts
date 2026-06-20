import { useEffect, useMemo } from 'react';

import { useNavigate } from '@tanstack/react-router';

import { zodResolver } from '@hookform/resolvers/zod';
import { isNotNil } from 'es-toolkit';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';

import {
  useApplyInspection,
  useFindActiveMoveOutScheduleWithSlots,
  useFindMyInspection,
  useUpdateInspection,
} from './queries';

const applicationFormSchema = z
  .object({
    inspectionDayTimestamp: z.number().nullable(),
    inspectionSlotUuid: z.string().nullable(),
  })
  .refine((data) => isNotNil(data.inspectionDayTimestamp) && isNotNil(data.inspectionSlotUuid));

export const useApplicationForm = ({
  applyInspection: { onSuccess: onApplySuccess, onFull: onApplyFull } = {},
  updateInspection: {
    onModifyTimeRestricted,
    onFull: onUpdateFull,
    onSuccess: onUpdateSuccess,
  } = {},
}: {
  applyInspection: Parameters<typeof useApplyInspection>[0];
  updateInspection: Parameters<typeof useUpdateInspection>[0];
}) => {
  const navigate = useNavigate();
  const { inspectionDays, inspectionSlotsByDayTimestamp, isLoading, isError, isSuccess } =
    useFindActiveMoveOutScheduleWithSlots();
  const { inspectionStartTime, inspectionSlotUuid, applicationUuid, isApplicationUpdatable } =
    useFindMyInspection(isSuccess);
  const { mutateAsync: applyInspection } = useApplyInspection({
    onSuccess: onApplySuccess,
    onFull: onApplyFull,
  });
  const { mutateAsync: updateInspection } = useUpdateInspection({
    onSuccess: onUpdateSuccess,
    onFull: onUpdateFull,
    onModifyTimeRestricted: onModifyTimeRestricted,
  });

  const form = useForm({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: {
      inspectionDayTimestamp: null,
      inspectionSlotUuid: null,
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (inspectionStartTime && inspectionSlotUuid && isApplicationUpdatable) {
      form.reset({
        inspectionDayTimestamp: inspectionStartTime.startOf('day').valueOf(),
        inspectionSlotUuid,
      });
    }
  }, [inspectionStartTime, inspectionSlotUuid, form, isApplicationUpdatable]);

  const inspectionDayTimestamp = useWatch({
    control: form.control,
    name: 'inspectionDayTimestamp',
  });

  const selectedDaySlots = useMemo(
    () =>
      isNotNil(inspectionDayTimestamp) ? inspectionSlotsByDayTimestamp[inspectionDayTimestamp] : [],
    [inspectionDayTimestamp, inspectionSlotsByDayTimestamp],
  );

  const onSubmit = form.handleSubmit(({ inspectionSlotUuid }) => {
    if (inspectionSlotUuid === null) return;

    const request =
      applicationUuid && isApplicationUpdatable
        ? updateInspection({
            params: { path: { uuid: applicationUuid } },
            body: { inspectionSlotUuid },
          })
        : applyInspection({ body: { inspectionSlotUuid } });

    return request.then(() => navigate({ to: '/' })).catch(() => {});
  });

  return {
    form,
    inspectionDays,
    isLoading,
    isError,
    isSuccess,
    selectedDaySlots,
    inspectionDayTimestamp,
    onSubmit,
  };
};
