import { Link } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

export function AdminLandingFrame() {
  const { t } = useTranslation('admin');
  return (
    <div className="p-4">
      <Link to="/admin/schedules">{t('schedule.list')}</Link>
    </div>
  );
}
