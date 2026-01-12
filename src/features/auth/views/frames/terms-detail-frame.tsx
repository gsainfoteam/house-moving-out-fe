import { useNavigate, useParams } from '@tanstack/react-router';
import { ChevronLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// TODO: 디자인 수정되면 typography, color 토큰 사용해야 함

export function TermsDetailFrame() {
  const navigate = useNavigate();
  const { type } = useParams({ from: '/auth/terms/$type' });
  const { t } = useTranslation();

  const isPrivacy = type === 'privacy';
  const title = isPrivacy
    ? t('auth.consent.privacyPolicyTitle')
    : t('auth.consent.termsOfServiceTitle');
  const content = isPrivacy
    ? t('auth.consent.privacyPolicyContent', { returnObjects: true })
    : t('auth.consent.termsOfServiceContent', { returnObjects: true });

  const handleBack = () => {
    navigate({ to: '/auth/consent' });
  };

  return (
    <div className="flex h-screen flex-col px-4">
      <div className="flex items-center gap-4 py-4">
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center"
          aria-label={t('auth.consent.back')}
        >
          <ChevronLeft size={24} className="text-gray-700" />
        </button>
        <h2>{title}</h2>
      </div>
      <div className="h-0.5 rounded-lg bg-gray-200" />
      <div className="flex-1 overflow-y-auto py-6">
        {Array.isArray(content) ? (
          <div className="flex flex-col gap-6 whitespace-pre-line">
            {content.map((section, index) => (
              <p key={index}>{String(section)}</p>
            ))}
          </div>
        ) : (
          <p className="whitespace-pre-line">{String(content)}</p>
        )}
      </div>
    </div>
  );
}
