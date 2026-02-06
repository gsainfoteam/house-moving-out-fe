import { Link, useParams } from '@tanstack/react-router';

import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import { Button, Loading } from '@/common/components';

import { Gender } from '../../models';
import { useGetMoveOutScheduleQuery, useInspectorsOfSchedule } from '../../viewmodels';
import { SlotSummary } from '../components/slot-summary';

export function InspectorsListFrame() {
  const { uuid } = useParams({ from: '/admin/schedules/$uuid/inspectors' });
  const { data: inspectors, error: inspectorsError } = useInspectorsOfSchedule(uuid);
  const { t } = useTranslation('admin');
  const { data: schedule, error: scheduleError } = useGetMoveOutScheduleQuery(uuid);

  if (scheduleError || inspectorsError)
    return <div className="p-4">{t('schedule.detail.notFound')}</div>;
  if (!schedule || !inspectors) return <Loading />;

  const maleSlotTimes = inspectors
    .filter((i) => i.gender === Gender.MALE)
    .flatMap((i) => i.availableSlots.map((s) => dayjs(s.startTime)));
  const femaleSlotTimes = inspectors
    .filter((i) => i.gender === Gender.FEMALE)
    .flatMap((i) => i.availableSlots.map((s) => dayjs(s.startTime)));

  return (
    <div className="flex flex-col gap-4 p-4">
      <div>{JSON.stringify(inspectors)}</div>
      <div className="flex gap-2">
        <SlotSummary
          type="male"
          slots={schedule.inspectionSlots.map((s) => ({
            ...s,
            maleReservedCount:
              s.maleCapacity - maleSlotTimes.filter((t) => t.isSame(s.startTime)).length * 2,
          }))}
        />
        <SlotSummary
          type="female"
          slots={schedule.inspectionSlots.map((s) => ({
            ...s,
            femaleReservedCount:
              s.femaleCapacity - femaleSlotTimes.filter((t) => t.isSame(s.startTime)).length * 2,
          }))}
        />
      </div>
      <Button asChild>
        <Link to="/admin/schedules/$uuid/inspectors" params={{ uuid }}>
          {t('inspectors.create.action')}
        </Link>
      </Button>
    </div>
  );
}
