import { useNavigate } from '@tanstack/react-router';

import { zodResolver } from '@hookform/resolvers/zod';
import { uniq } from 'es-toolkit';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { z } from 'zod';

import { Gender } from '../models';
import { useCreateInspector } from './queries/use-create-inspector';
import { useCreateTemporaryInspector } from './queries/use-create-temporary-inspector';

const schema = z.object({
  name: z.string().min(1),
  gender: z.enum(Gender),
  studentNumber: z.string().regex(/^\d{8}$/),
  email: z.email(),
  availableSlotUuids: z.uuid().array(),
});

const useCreateInspectorFormInternal = (scheduleUuid: string, isTemporary = false) => {
  const { register, handleSubmit, formState, setValue, getValues, control } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      availableSlotUuids: [],
    },
  });
  const { mutateAsync: createInspector } = useCreateInspector();
  const { mutateAsync: createTemporaryInspector } = useCreateTemporaryInspector();
  const { t } = useTranslation('admin');
  const navigate = useNavigate();

  const onSubmit = handleSubmit(
    async (data) => {
      if (isTemporary) {
        const sanitized = schema.omit({ availableSlotUuids: true }).parse(data);
        await createTemporaryInspector({
          params: { query: { scheduleUuid } },
          body: { inspectors: [sanitized] },
        });
      } else {
        await createInspector({
          params: { query: { scheduleUuid } },
          body: { inspectors: [data] },
        });
      }
      toast.success(t('inspectors.create.succeed'));
      await navigate({
        to: '/admin/schedules/$uuid/inspectors',
        from: '/admin/schedules/$uuid/inspectors/new',
      });
    },
    () => {
      toast.error(t('inspectors.create.error.formError'));
    },
  );

  const setGender = (gender: Gender) => setValue('gender', gender);
  const gender = useWatch({ control, name: 'gender' });
  const toggleSlot = (uuid: string, enable: boolean) => {
    const value = getValues('availableSlotUuids');
    setValue(
      'availableSlotUuids',
      enable ? uniq([...value, uuid]) : value.filter((v) => v !== uuid),
    );
  };
  const slots = useWatch({ control, name: 'availableSlotUuids' });

  return {
    register,
    onSubmit,
    isSubmitting: formState.isSubmitting,
    setGender,
    gender,
    errors: formState.errors,
    toggleSlot,
    slots,
  };
};

export const useCreateInspectorForm = (scheduleUuid: string) =>
  useCreateInspectorFormInternal(scheduleUuid);
export const useCreateTemporaryInspectorForm = (scheduleUuid: string) =>
  useCreateInspectorFormInternal(scheduleUuid, true);
