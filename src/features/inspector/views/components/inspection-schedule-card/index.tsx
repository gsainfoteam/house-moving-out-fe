import { useTranslation } from 'react-i18next';

import { cn } from '@/common/utils';

import type { ScheduleStatus } from '../../../models';
import type { Dayjs } from 'dayjs';

export function InspectionScheduleCard({
  time,
  roomLabel,
  residentName,
  status,
  className,
}: InspectionScheduleCard.Props) {
  const { t } = useTranslation('inspector');

  return (
    <div
      className={cn(
        'bg-bg-white border-icon-light-gray hover:bg-bg-surface border transition-colors duration-200',
        'flex w-full items-center justify-between rounded-xl',
        'px-4 py-3',
        className,
      )}
    >
      <div className="flex items-center gap-4">
        <h1 className="text-text-black tabular-nums">{time.format('HH:mm')}</h1>
        <div className="bg-icon-light-gray my-1 w-px self-stretch" aria-hidden />
        <div className="flex flex-col gap-1 leading-tight">
          <span className="text-box text-text-black">{roomLabel}</span>
          <span className="text-box2 text-text-gray">{residentName}</span>
        </div>
      </div>

      <span
        className={cn(
          'text-box2 rounded-full px-3 py-1 text-center',
          InspectionScheduleCard.statusStyle[status],
        )}
      >
        {/* t('schedule.status.draft') */}
        {/* t('schedule.status.active') */}
        {/* t('schedule.status.completed') */}
        {/* t('schedule.status.canceled') */}
        {t(`schedule.status.${status.toLowerCase()}`)}
      </span>
    </div>
  );
}

export namespace InspectionScheduleCard {
  export type Props = {
    time: Dayjs;
    roomLabel: string;
    residentName: string;
    status: ScheduleStatus;
    className?: string;
  };

  export const statusStyle: Record<ScheduleStatus, string> = {
    DRAFT: cn('bg-icon-gray text-text-white'),
    ACTIVE: cn('bg-primary-main text-text-white'),
    COMPLETED: cn('bg-text-black text-text-white'),
    CANCELED: cn('bg-icon-red/80 text-status-fail'),
  };
}
