import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import type { components } from '@/@types/api-schema';

import { useUserAuth } from './use-user-auth';

import type { TFunction } from 'i18next';

type ConsentVersionInfo = components['schemas']['ConsentVersionInfo'];
type RequiredConsents = components['schemas']['RequiredConsents'];

const isSameVersion = (versionInfo?: ConsentVersionInfo) =>
  versionInfo != null && versionInfo.currentVersion === versionInfo.requiredVersion;

const createConsentSchema = (t: TFunction<'auth'>) =>
  z.object({
    privacyPolicy: z.boolean().refine((val) => val === true, {
      error: t('consent.error.privacyPolicyRequired'),
    }),
    termsOfService: z.boolean().refine((val) => val === true, {
      error: t('consent.error.termsOfServiceRequired'),
    }),
  });

export type ConsentFormData = z.infer<ReturnType<typeof createConsentSchema>>;

export const useConsentForm = (requiredConsents?: RequiredConsents) => {
  const { t } = useTranslation('auth');
  const { logIn } = useUserAuth({ showToast: true });

  const consentSchema = createConsentSchema(t);

  const form = useForm<ConsentFormData>({
    resolver: zodResolver(consentSchema),
    defaultValues: {
      privacyPolicy: isSameVersion(requiredConsents?.privacy),
      termsOfService: isSameVersion(requiredConsents?.terms),
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
      body: {
        agreedToPrivacy: data.privacyPolicy,
        agreedToTerms: data.termsOfService,
        // TODO: 버전 정보 및 내용 받아오기 - terms 사이트에서
        privacyVersion: '1.0.0',
        termsVersion: '1.0.0',
      },
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
