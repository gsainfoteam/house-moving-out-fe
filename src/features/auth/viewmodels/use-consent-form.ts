import { zodResolver } from '@hookform/resolvers/zod';
import type { TFunction } from 'i18next';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { useUserAuth } from './use-user-auth';

const createConsentSchema = (t: TFunction) =>
  z.object({
    privacyPolicy: z.boolean().refine((val) => val === true, {
      error: t('consent.error.privacyPolicyRequired'),
    }),
    termsOfService: z.boolean().refine((val) => val === true, {
      error: t('consent.error.termsOfServiceRequired'),
    }),
  });

export type ConsentFormData = z.infer<ReturnType<typeof createConsentSchema>>;

export const useConsentForm = () => {
  const { t } = useTranslation('auth');
  const { logIn } = useUserAuth({ showToast: true });

  const consentSchema = createConsentSchema(t);

  const form = useForm<ConsentFormData>({
    resolver: zodResolver(consentSchema),
    defaultValues: {
      privacyPolicy: false,
      termsOfService: false,
    },
    mode: 'onChange',
  });

  const privacyPolicy = useWatch({
    control: form.control,
    name: 'privacyPolicy',
  });
  const termsOfService = useWatch({
    control: form.control,
    name: 'termsOfService',
  });
  const allChecked = privacyPolicy && termsOfService;

  const handleAllChange = (checked: boolean) => {
    form.setValue('privacyPolicy', checked);
    form.setValue('termsOfService', checked);
    form.trigger();
  };

  const onSubmit = form.handleSubmit(async (data) => {
    await logIn({
      agreedToPrivacy: data.privacyPolicy,
      agreedToTerms: data.termsOfService,
      privacyVersion: '1.0.0',
      termsVersion: '1.0.0',
    });
  });

  return {
    form,
    privacyPolicy,
    termsOfService,
    allChecked,
    handleAllChange,
    onSubmit,
  };
};
