import { useParams } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import { Loading } from '@/common/components';

import { useTargets } from '../../viewmodels';
import { RoomVisualize } from '../components';

export function RoomListFrame() {
  const { uuid } = useParams({ from: '/_auth-required/admin/schedules/$uuid/rooms' });
  const { data: targets, isNotFound: targetNotFound, error: targetError } = useTargets(uuid);
  const { t } = useTranslation('admin');

  if (targetNotFound) return <div className="p-4">{t('schedule.detail.notFound')}</div>;
  if (targetError) return <div className="p-4">{t('schedule.detail.error')}</div>;
  if (!targets) return <Loading containerClassName="h-full" />;
  return (
    <div className="flex flex-col gap-4 p-4">
      <RoomVisualize targets={targets} />
    </div>
  );
}
