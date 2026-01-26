import { useNavigate, useRouterState } from '@tanstack/react-router';

import { ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button, Checkbox, LanguageToggle } from '@/common/components';

import { useAuthPrompt, useConsentForm } from '../../viewmodels';

import type { RequiredConsents } from '../../models';

// FIXME: 디자인 수정되면 typography, color 토큰 사용해야 함

export function ConsentFrame() {
  const requiredConsents = useAuthPrompt((state) => state.requiredConsents);
  if (!requiredConsents) {
    return null;
  }
  return <ConsentInnerFrame requiredConsents={requiredConsents} />;
}

function ConsentInnerFrame({ requiredConsents }: { requiredConsents: RequiredConsents }) {
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const consentFormData = useRouterState({
    select: (s) => s.location.state?.consentFormData,
  });

  const {
    form: { register, formState, watch },
    allChecked,
    handleAllChange,
    onSubmit,
  } = useConsentForm(requiredConsents, consentFormData);

  const privacyVersion = watch('privacyVersion');
  const tosVersion = watch('tosVersion');
  const formValues = watch();

  const handleTermsClick = (type: 'privacy' | 'tos', version: string) => {
    navigate({
      to: '/auth/terms/$type',
      params: { type },
      search: { version },
      state: (prev) => ({
        ...prev,
        consentFormData: formValues,
      }),
    });
  };

  return (
    <form onSubmit={onSubmit} className="relative flex h-screen flex-col px-4 pt-16 pb-8">
      <div className="absolute top-4 right-4">
        <LanguageToggle />
      </div>
      <h1 className="mb-6 whitespace-pre-line">{t('consent.title')}</h1>
      <div className="mt-auto flex flex-col">
        <div className="flex flex-col gap-5">
          <label className="flex cursor-pointer items-center gap-3">
            <Checkbox checked={allChecked} onChange={(e) => handleAllChange(e.target.checked)} />
            <span>{t('consent.agreeAll')}</span>
          </label>

          <div className="h-1 rounded-lg bg-gray-200" />

          <div className="flex flex-col gap-3">
            <label className="flex cursor-pointer items-center gap-3">
              <Checkbox {...register('privacy')} />
              <span className="flex-1">{t('consent.privacyPolicy')}</span>
              <button
                type="button"
                onClick={() => handleTermsClick('privacy', privacyVersion)}
                className="flex items-center"
                aria-label={t('consent.viewPrivacyPolicy')}
              >
                <ChevronRight size={20} className="text-gray-500" />
              </button>
            </label>

            <label className="flex cursor-pointer items-center gap-3">
              <Checkbox {...register('tos')} />
              <span className="flex-1">{t('consent.termsOfService')}</span>
              <button
                type="button"
                onClick={() => handleTermsClick('tos', tosVersion)}
                className="flex items-center"
                aria-label={t('consent.viewTermsOfService')}
              >
                <ChevronRight size={20} className="text-gray-500" />
              </button>
            </label>
          </div>
        </div>

        <div className="mt-10">
          <Button type="submit" variant="default" disabled={!formState.isValid} className="w-full">
            {t('consent.next')}
          </Button>
        </div>
      </div>
    </form>
  );
}
