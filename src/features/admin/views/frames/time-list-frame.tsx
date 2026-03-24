import { useParams } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import { Loading } from '@/common/components';

import { Gender, useGetMoveOutScheduleQuery } from '../../viewmodels';
import { SlotVisualize } from '../components';

export function TimeListFrame() {
  const { uuid } = useParams({ from: '/_auth-required/admin/schedules/$uuid/times' });
  const { data: schedule, isNotFound, error } = useGetMoveOutScheduleQuery(uuid);
  const { t } = useTranslation('admin');

  if (isNotFound) return <div className="p-4">{t('schedule.detail.notFound')}</div>;
  if (error) return <div className="p-4">{t('schedule.detail.error')}</div>;
  if (!schedule) return <Loading containerClassName="h-full" />;

  return (
    <div className="flex gap-2 p-4">
      <SlotVisualize
        slots={schedule.inspectionSlots.filter((s) => s.gender === Gender.MALE)}
        title={t('schedule.detail.summary.male')}
        capacity={schedule.inspectionSlots.find((s) => s.gender === Gender.MALE)?.capacity ?? 0}
      />
      <SlotVisualize
        slots={schedule.inspectionSlots.filter((s) => s.gender === Gender.FEMALE)}
        title={t('schedule.detail.summary.female')}
        capacity={schedule.inspectionSlots.find((s) => s.gender === Gender.FEMALE)?.capacity ?? 0}
      />
    </div>
  );
}
