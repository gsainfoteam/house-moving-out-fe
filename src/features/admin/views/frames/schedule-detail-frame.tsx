import { useParams } from '@tanstack/react-router';

import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import { Loading } from '@/common/components';

import { useGetMoveOutScheduleQuery } from '../../viewmodels';
import { SlotVisualize } from '../components';

export function ScheduleDetailFrame() {
  const { uuid } = useParams({ from: '/admin/schedules/$uuid/' });
  const { data: schedule, isNotFound } = useGetMoveOutScheduleQuery(uuid);
  const { t } = useTranslation('admin');

  if (isNotFound) return <div className="p-4">{t('schedule.detail.notFound')}</div>;
  if (!schedule) return <Loading containerClassName="h-auto flex-1" />;

  const maleCapacity = schedule.inspectionSlots[0].maleCapacity;
  const femaleCapacity = schedule.inspectionSlots[0].femaleCapacity;

  return (
    <div className="flex flex-col gap-4 p-4">
      <div>
        <div>ID: {schedule.uuid}</div>
        <div>
          {t('schedule.create.title.label')}: {schedule.title}
        </div>
        <div>
          {t('schedule.detail.status')}: {schedule.status}
        </div>
        <div>
          {t('schedule.detail.applicationTime')}:{' '}
          {`${dayjs(schedule.applicationStartTime).format('LLLL')} ~ ${dayjs(schedule.applicationEndTime).format('LLLL')}`}
        </div>
        <div>
          {t('schedule.create.summary.semester.label')}: {schedule.currentSemester.year}{' '}
          {schedule.currentSemester.season}
        </div>
        <div>
          {t('schedule.detail.capacity.male')}: {maleCapacity}
        </div>
        <div>
          {t('schedule.detail.capacity.female')}: {femaleCapacity}
        </div>
        <div>
          {t('schedule.detail.inspectors.male')}: {Math.ceil(maleCapacity / 2)}
        </div>
        <div>
          {t('schedule.detail.inspectors.female')}: {Math.ceil(femaleCapacity / 2)}
        </div>
      </div>
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
          capacity={schedule.inspectionSlots[0].maleCapacity}
        />
      </div>
    </div>
  );
}
