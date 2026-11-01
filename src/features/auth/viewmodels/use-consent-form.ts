import { useNavigate } from '@tanstack/react-router';

import { AccountError, useAccount } from '@gsainfoteam/account-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { z } from 'zod';

import type { RequiredConsents } from '../models';
import type { TFunction } from 'i18next';

const createConsentSchema = (t: TFunction<'auth'>) =>
  z.object({
    privacy: z.boolean().refine((val) => val === true, {
      error: t('consent.error.privacyRequired'),
    }),
    tos: z.boolean().refine((val) => val === true, {
      error: t('consent.error.tosRequired'),
    }),
    privacyVersion: z.string(),
    tosVersion: z.string(),
  });

export type ConsentFormData = z.infer<ReturnType<typeof createConsentSchema>>;

export const useConsentForm = (requiredConsents: RequiredConsents, formData?: ConsentFormData) => {
  const { t } = useTranslation('auth');
  const { retryLogin } = useAccount();
  const navigate = useNavigate();

  const consentSchema = createConsentSchema(t);

  const form = useForm<ConsentFormData>({
    resolver: zodResolver(consentSchema),
    defaultValues: formData ?? {
      privacy: requiredConsents.privacy.currentVersion === requiredConsents.privacy.requiredVersion,
      tos: requiredConsents.terms.currentVersion === requiredConsents.terms.requiredVersion,
      privacyVersion: requiredConsents.privacy.requiredVersion,
      tosVersion: requiredConsents.terms.requiredVersion,
    },
    mode: 'onChange',
  });

  const privacy = useWatch({
    control: form.control,
    name: 'privacy',
  });
  const tos = useWatch({
    control: form.control,
    name: 'tos',
  });
  const allChecked = privacy && tos;

  const handleAllChange = (checked: boolean) => {
    form.setValue('privacy', checked);
    form.setValue('tos', checked);
    form.trigger();
  };

  const onSubmit = form.handleSubmit(async (data) => {
    await retryLogin({
      agreedToPrivacy: data.privacy,
      agreedToTerms: data.tos,
      privacyVersion: data.privacyVersion,
      termsVersion: data.tosVersion,
    }).catch((error: unknown) => {
      // 그새 약관이 또 바뀌었으면 새 거절이 와서 이 화면이 그 내용으로 다시 그려진다. ticket 이 만료됐으면 IdP 로그인부터 다시 한다
      if (AccountError.is(error, 'session_rejected')) return;
      toast.error(t('error.loginFailed'));
      navigate({ to: '/auth/login' });
    });
  });

  return {
    form,
    privacy,
    tos,
    allChecked,
    handleAllChange,
    onSubmit,
  };
};
