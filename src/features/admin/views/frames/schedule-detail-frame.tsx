import { useParams } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import { Loading } from '@/common/components';

import { useGetMoveOutScheduleQuery, useTargets } from '../../viewmodels';
import { ScheduleSummary } from '../components';

export function ScheduleDetailFrame() {
  const { uuid } = useParams({ from: '/_auth-required/admin/schedules/$uuid/' });
  const { data: schedule, isNotFound, error } = useGetMoveOutScheduleQuery(uuid);
  const { data: targets, isNotFound: targetNotFound, error: targetError } = useTargets(uuid);
  const { t } = useTranslation('admin');

  if (isNotFound || targetNotFound)
    return <div className="p-4">{t('schedule.detail.notFound')}</div>;
  if (error || targetError) return <div className="p-4">{t('schedule.detail.error')}</div>;
  if (!schedule || !targets) return <Loading containerClassName="h-full" />;

  return (
    <div className="flex flex-col gap-4 p-4">
      <ScheduleSummary schedule={schedule} targets={targets} />
    </div>
  );
}
