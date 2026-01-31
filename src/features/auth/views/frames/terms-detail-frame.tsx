import { useNavigate, useParams, useSearch } from '@tanstack/react-router';

import { ChevronLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// FIXME: 디자인 수정되면 typography, color 토큰 사용해야 함

export function TermsDetailFrame() {
  const navigate = useNavigate();
  const { type } = useParams({ from: '/auth/terms/$type' });
  const { version } = useSearch({ from: '/auth/terms/$type' });
  const { t } = useTranslation('auth');

  const handleBack = () => {
    navigate({
      to: '/auth/consent',
      state: (prev) => ({ ...prev }),
    });
  };

  const titles = t('consent.termsTitle', { returnObjects: true }) as Record<typeof type, string>;

  return (
    <div className="flex h-screen flex-col px-4">
      <div className="relative flex items-center py-4">
        <button
          type="button"
          onClick={handleBack}
          className="absolute left-0 flex items-center"
          aria-label={t('consent.back')}
        >
          <ChevronLeft size={24} className="text-icon-gray" />
        </button>
        <h2 className="w-full text-center">{titles[type] ?? ''}</h2>
      </div>
      <div className="bg-icon-light-gray h-0.5 rounded-lg" />
      <div className="flex-1 overflow-y-auto py-4">
        <iframe
          src={`https://terms.gistory.me/embedded/moving-out/${type}/${version}/`}
          className="h-full w-full"
        />
      </div>
    </div>
  );
}
