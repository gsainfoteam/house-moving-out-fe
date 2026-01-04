import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import type { TFunction } from 'i18next';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { useConsent } from './use-consent';

const createConsentSchema = (t: TFunction) =>
  z.object({
    privacyPolicy: z.boolean().refine((val) => val === true, {
      message: t('consent.error.privacyPolicyRequired'),
    }),
    termsOfService: z.boolean().refine((val) => val === true, {
      message: t('consent.error.termsOfServiceRequired'),
    }),
  });

export type ConsentFormData = z.infer<ReturnType<typeof createConsentSchema>>;

export const useConsentForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setPrivacyPolicy, setTermsOfService } = useConsent();

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

  const onSubmit = form.handleSubmit((data: ConsentFormData) => {
    setPrivacyPolicy(data.privacyPolicy);
    setTermsOfService(data.termsOfService);
    navigate({ to: '/' });
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
