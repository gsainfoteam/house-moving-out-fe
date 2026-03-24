import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import { ScheduleStatusBadge } from '../schedule-status-badge';

import type { MoveOutSchedule } from '../../../viewmodels';

export function ScheduleCard({ schedule }: { schedule: MoveOutSchedule }) {
  const { t } = useTranslation('admin');
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex gap-1.5">
        <h3 className="text-body-lg text-text-primary font-bold">{schedule.title}</h3>
        <ScheduleStatusBadge status={schedule.status} />
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-label text-text-secondary font-medium">
          {t('schedule.detail.applicationTime')}
        </span>
        <div className="text-body-lg text-text-primary">
          {`${dayjs(schedule.applicationStartTime).format('LLLL')} ~ ${dayjs(schedule.applicationEndTime).format('LLLL')}`}
        </div>
      </div>
    </div>
  );
}
