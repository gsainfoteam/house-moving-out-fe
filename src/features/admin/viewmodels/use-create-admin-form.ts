import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { z } from 'zod';

import { useCreateAdmin } from './queries/use-create-admin';

const schema = z.object({
  name: z.string().min(1),
  studentNumber: z.string().regex(/^\d{8}$/),
});

export const useCreateAdminForm = (onSuccess?: () => void) => {
  const { register, handleSubmit, formState, reset } = useForm({
    resolver: zodResolver(schema),
  });
  const { mutateAsync: createAdmin, isPending } = useCreateAdmin();
  const { t } = useTranslation('admin', { keyPrefix: 'admins.create' });

  const onSubmit = handleSubmit(
    async (data) => {
      await createAdmin({ body: data });
      toast.success(t('success'));
      reset();
      onSuccess?.();
    },
    () => {
      toast.error(t('error.formError'));
    },
  );

  return {
    register,
    onSubmit,
    isSubmitting: isPending,
    errors: formState.errors,
  };
};
