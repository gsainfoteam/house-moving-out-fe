import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { isAxiosError } from 'axios';
import type { TFunction } from 'i18next';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from 'react-oauth2-code-pkce';
import { toast } from 'sonner';
import { z } from 'zod';

import { authApi } from '../models';

import { useToken } from './use-token';

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
  const { token, logOut } = useAuthContext();

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

  // TODO: tryLogin 측 코드랑 코드 중앙화 필요

  const onSubmit = form.handleSubmit(async (data) => {
    const goToIdpToken = () => navigate({ to: '/auth/login' });
    const goToConsentData = () => navigate({ to: '/auth/consent' });
    const goToHome = () => navigate({ to: '/' });

    if (!token) {
      toast.error(t('auth.error.noIdpToken'));
      return await goToIdpToken();
    }

    try {
      const response = await authApi.userLogin(token, {
        agreedToPrivacy: data.privacyPolicy,
        agreedToTerms: data.termsOfService,
        privacyVersion: '1.0.0',
        termsVersion: '1.0.0',
      });

      useToken.getState().saveToken(response.access_token);
      return await goToHome();
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 401) {
          logOut();
          toast.error(t('auth.error.invalidIdpToken'));
          return await goToIdpToken();
        } else if (error.response?.status === 403) {
          // TODO: 약관 버전이 달라져도 403 에러 발생함 - 이 때 에러 스키마를 보고 처리해야 함
          return await goToConsentData();
        } else {
          toast.error(t('auth.error.loginFailed'));
          return await goToIdpToken();
        }
      } else {
        toast.error(t('auth.error.loginFailed'));
        return await goToIdpToken();
      }
    }
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
