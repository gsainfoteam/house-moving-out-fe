import { Link } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import { Button } from '@/common/components';

export function AdminLandingFrame() {
  const { t } = useTranslation('admin');
  return (
    <div className="p-4">
      <Button asChild>
        <Link to="/admin/schedules">{t('schedule.list')}</Link>
      </Button>
    </div>
  );
}
