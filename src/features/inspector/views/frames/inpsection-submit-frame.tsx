import { useTranslation } from 'react-i18next';

export function InspectionSubmitFrame() {
  const { t } = useTranslation('inspector');
  return <div>{t('note.submitWithReinspection')}</div>;
}
