import { useTranslation } from 'react-i18next';

import { cn } from '@/common/utils';
import { ApplicationStatus } from '@/features/admin';

import type { Dayjs } from 'dayjs';

export function InspectionScheduleCard({
  time,
  roomLabel,
  residentName,
  status,
  className,
  ...props
}: InspectionScheduleCard.Props) {
  const { t } = useTranslation('inspector');

  const effectiveStatus =
    status === ApplicationStatus.PENDING_NO_SHOW ? 'draft' : (status?.toLowerCase() ?? 'draft');

  return (
    <div
      className={cn(
        'bg-bg-white border-icon-light-gray hover:bg-bg-surface border transition-colors duration-200',
        'flex w-full items-center justify-between rounded-xl',
        'px-4 py-3',
        className,
      )}
      {...props}
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
          InspectionScheduleCard.statusStyle[effectiveStatus],
        )}
      >
        {/* t('schedule.status.draft') */}
        {/* t('schedule.status.passed') */}
        {/* t('schedule.status.failed') */}
        {/* t('schedule.status.no_show') */}
        {t(`schedule.status.${effectiveStatus}`)}
      </span>
    </div>
  );
}

export namespace InspectionScheduleCard {
  export interface Props extends React.HTMLAttributes<HTMLDivElement> {
    time: Dayjs;
    roomLabel: string;
    residentName: string;
    status?: ApplicationStatus;
    className?: string;
  }

  export const statusStyle = {
    draft: cn('bg-icon-gray text-text-white'),
    passed: cn('bg-primary-main text-text-white'),
    failed: cn('bg-icon-red/80 text-status-fail'),
    no_show: cn('bg-icon-red/80 text-status-fail'),
  };
}
