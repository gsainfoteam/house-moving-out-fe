import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import type { MoveOutSchedule } from '../../models';

export function ScheduleCard({ schedule }: { schedule: MoveOutSchedule }) {
  const { t } = useTranslation('admin');
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex flex-col gap-1.5">
        <h3 className="text-h2 text-text-black font-bold">{schedule.title}</h3>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-sub text-text-gray font-medium">
          {t('schedule.card.applicationTime')}
        </span>
        <div className="text-box text-text-black">
          {`${dayjs(schedule.applicationStartTime).format('LLLL')} ~ ${dayjs(schedule.applicationEndTime).format('LLLL')}`}
        </div>
      </div>
    </div>
  );
}
