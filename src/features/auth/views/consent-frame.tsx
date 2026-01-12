import { Link } from '@tanstack/react-router';
import { ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { useConsentForm } from '../viewmodels';

import { Button, Checkbox, LanguageToggle } from '@/common/components';

export function ConsentFrame() {
  const { t } = useTranslation();
  const {
    form: { register, formState },
    allChecked,
    handleAllChange,
    onSubmit,
  } = useConsentForm();

  return (
    <form
      onSubmit={onSubmit}
      className="relative flex h-screen flex-col px-4 pt-16 pb-8"
    >
      <div className="absolute top-4 right-4">
        <LanguageToggle />
      </div>
      <h1 className="mb-6 whitespace-pre-line">{t('auth.consent.title')}</h1>
      <div className="mt-auto flex flex-col">
        <div className="flex flex-col gap-5">
          <label className="flex cursor-pointer items-center gap-3">
            <Checkbox
              checked={allChecked}
              onChange={(e) => handleAllChange(e.target.checked)}
            />
            <span>{t('auth.consent.agreeAll')}</span>
          </label>

          <div className="h-1 rounded-lg bg-gray-200" />

          <div className="flex flex-col gap-3">
            <label className="flex cursor-pointer items-center gap-3">
              <Checkbox {...register('privacyPolicy')} />
              <span className="flex-1">{t('auth.consent.privacyPolicy')}</span>
              <Link
                to="/auth/terms/$type"
                params={{ type: 'privacy' }}
                className="flex items-center"
                aria-label={t('auth.consent.viewPrivacyPolicy')}
              >
                <ChevronRight size={20} className="text-gray-500" />
              </Link>
            </label>

            <label className="flex cursor-pointer items-center gap-3">
              <Checkbox {...register('termsOfService')} />
              <span className="flex-1">{t('auth.consent.termsOfService')}</span>
              <Link
                to="/auth/terms/$type"
                params={{ type: 'terms' }}
                className="flex items-center"
                aria-label={t('auth.consent.viewTermsOfService')}
              >
                <ChevronRight size={20} className="text-gray-500" />
              </Link>
            </label>
          </div>
        </div>

        <div className="mt-10">
          <Button
            type="submit"
            variant="primary"
            disabled={!formState.isValid}
            className="w-full"
          >
            {t('auth.consent.next')}
          </Button>
        </div>
      </div>
    </form>
  );
}
