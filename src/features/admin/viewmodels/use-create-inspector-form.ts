import { useNavigate } from '@tanstack/react-router';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import z from 'zod';

import { Gender } from '../models';
import { useCreateInspector } from './queries/use-create-inspector';

const schema = z.object({
  name: z.string().min(1),
  gender: z.enum(Gender),
  studentNumber: z.string().regex(/^\d{8}$/),
  email: z.email(),
  availableSlotUuids: z.uuid().array(),
});

export const useCreateInspectorForm = () => {
  const { register, handleSubmit, formState, setValue, getValues, control } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      availableSlotUuids: [],
    },
  });
  const { mutateAsync: createInspector } = useCreateInspector();
  const { t } = useTranslation('admin');
  const navigate = useNavigate();

  const onSubmit = handleSubmit(
    async (data) => {
      await createInspector({ body: { inspectors: [data] } });
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
      enable ? [...new Set(value).add(uuid)] : value.filter((v) => v !== uuid),
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
