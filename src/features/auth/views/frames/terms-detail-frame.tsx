import { useNavigate, useParams, useSearch } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import { TermsDetailView } from '../views/terms-detail-view';

export function TermsDetailFrame() {
  const navigate = useNavigate();
  const { type } = useParams({ from: '/auth/terms/$type' });
  const { version } = useSearch({ from: '/auth/terms/$type' });
  const { t } = useTranslation('auth');

  const titles = t('consent.termsTitle', { returnObjects: true }) as Record<typeof type, string>;

  const handleBack = () => {
    navigate({
      to: '/auth/consent',
      state: (prev) => ({ ...prev }),
    });
  };

  return (
    <TermsDetailView
      title={titles[type] ?? ''}
      termsUrl={`https://terms.gistory.me/embedded/moving-out/${type}/${version}/`}
      onBack={handleBack}
    />
  );
}
