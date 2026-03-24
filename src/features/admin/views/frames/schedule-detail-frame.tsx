import { useParams } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import { Loading } from '@/common/components';

import { Gender, useGetMoveOutScheduleQuery, useTargets } from '../../viewmodels';
import { ScheduleSummary, SlotVisualize } from '../components';

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
      <div className="flex gap-2">
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
    </div>
  );
}
