import { useParams } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import { Loading } from '@/common/components';

import { useGetMoveOutScheduleQuery, useTargets } from '../../viewmodels';
import { RoomVisualize, ScheduleSummary, SlotVisualize } from '../components';

export function ScheduleDetailFrame() {
  const { uuid } = useParams({ from: '/_auth-required/admin/schedules/$uuid/' });
  const { data: schedule, isNotFound } = useGetMoveOutScheduleQuery(uuid);
  const { data: targets, isNotFound: targetNotFound } = useTargets(uuid);
  const { t } = useTranslation('admin');

  if (isNotFound || targetNotFound)
    return <div className="p-4">{t('schedule.detail.notFound')}</div>;
  if (!schedule || !targets) return <Loading containerClassName="h-full" />;

  return (
    <div className="flex flex-col gap-4 p-4">
      <ScheduleSummary schedule={schedule} />
      <div className="flex gap-2">
        <SlotVisualize
          slots={schedule.inspectionSlots.map((s) => ({
            ...s,
            reservedCount: s.maleReservedCount,
          }))}
          title={t('schedule.detail.summary.male')}
          capacity={schedule.inspectionSlots[0].maleCapacity}
        />
        <SlotVisualize
          slots={schedule.inspectionSlots.map((s) => ({
            ...s,
            reservedCount: s.femaleReservedCount,
          }))}
          title={t('schedule.detail.summary.female')}
          capacity={schedule.inspectionSlots[0].femaleCapacity}
        />
      </div>
      <div>
        <RoomVisualize targets={targets} />
      </div>
    </div>
  );
}
