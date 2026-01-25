import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from 'react-oauth2-code-pkce';
import { z } from 'zod';

import type { components } from '@/@types/api-schema';

import { useUserAuth } from './use-user-auth';

import type { TFunction } from 'i18next';

type ConsentVersionInfo = components['schemas']['ConsentVersionInfo'];
type RequiredConsents = components['schemas']['RequiredConsents'];

const isConsented = (versionInfo?: ConsentVersionInfo) =>
  versionInfo == null || versionInfo.currentVersion === versionInfo.requiredVersion;

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

// FIXME: 프론트엔드에서 하는 게 맞나?
const getLatestVersion = async (): Promise<{ privacyVersion: string; tosVersion: string }> => {
  const url = 'https://terms.gistory.me/moving-out/index.json';
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch version info: ${response.statusText}`);
  }

  const data = (await response.json()) as {
    service: string;
    privacy: string;
    tos: string;
  };
  return {
    privacyVersion: data.privacy,
    tosVersion: data.tos,
  };
};

export const useConsentForm = (
  requiredConsents?: RequiredConsents,
  initialFormData?: ConsentFormData,
) => {
  const { token } = useAuthContext();
  const { t } = useTranslation('auth');
  const { logIn } = useUserAuth({ showToast: true });

  const consentSchema = createConsentSchema(t);

  const form = useForm<ConsentFormData>({
    resolver: zodResolver(consentSchema),
    defaultValues: initialFormData ?? {
      privacy: isConsented(requiredConsents?.privacy),
      tos: isConsented(requiredConsents?.terms),
      privacyVersion: requiredConsents?.privacy?.requiredVersion ?? '',
      tosVersion: requiredConsents?.terms?.requiredVersion ?? '',
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

  useEffect(() => {
    const fetchVersions = async () => {
      try {
        const versions = await getLatestVersion();

        if (!requiredConsents?.privacy?.requiredVersion) {
          form.setValue('privacyVersion', versions.privacyVersion);
        }

        if (!requiredConsents?.terms?.requiredVersion) {
          form.setValue('tosVersion', versions.tosVersion);
        }
      } catch (error) {
        console.error('Failed to fetch latest versions:', error);
      }
    };

    fetchVersions();
  }, [form, requiredConsents?.privacy?.requiredVersion, requiredConsents?.terms?.requiredVersion]);

  const onSubmit = form.handleSubmit(async (data) => {
    await logIn({
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: {
        agreedToPrivacy: data.privacy,
        agreedToTerms: data.tos,
        privacyVersion: data.privacyVersion,
        termsVersion: data.tosVersion,
      },
    });
  });

  return {
    form,
    privacy,
    tos,
    allChecked,
    handleAllChange,
    onSubmit,
    getLatestVersion,
  };
};
