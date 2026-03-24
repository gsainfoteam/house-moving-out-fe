import { useMemo } from 'react';

import { useTranslation } from 'react-i18next';

import { cn } from '@/common/utils';

import type { Dayjs } from 'dayjs';

export function InspectionScheduleCard({
  time,
  roomLabel,
  residentName,
  isPassed,
  className,
  ...props
}: InspectionScheduleCard.Props) {
  const { t } = useTranslation('inspector');

  const status = useMemo(() => {
    if (isPassed === null) return 'draft';
    if (isPassed) return 'passed';
    return 'failed';
  }, [isPassed]);

  return (
    <div
      className={cn(
        'bg-bg border-border hover:bg-bg-surface border transition-colors duration-200',
        'flex w-full items-center justify-between rounded-xl',
        'px-4 py-3',
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-4">
        <span className="text-body-lg text-text-primary tabular-nums font-semibold">{time.format('HH:mm')}</span>
        <div className="bg-border my-1 w-px self-stretch" aria-hidden />
        <div className="flex flex-col gap-1 leading-tight">
          <span className="text-body-lg text-text-primary">{roomLabel}</span>
          <span className="text-body text-text-secondary">{residentName}</span>
        </div>
      </div>

      <span
        className={cn(
          'text-body rounded-full px-3 py-1 text-center',
          InspectionScheduleCard.statusStyle[status],
        )}
      >
        {/* t('schedule.status.draft') */}
        {/* t('schedule.status.passed') */}
        {/* t('schedule.status.failed') */}
        {t(`schedule.status.${status}`)}
      </span>
    </div>
  );
}

export namespace InspectionScheduleCard {
  export interface Props extends React.HTMLAttributes<HTMLDivElement> {
    time: Dayjs;
    roomLabel: string;
    residentName: string;
    isPassed: boolean | null;
    className?: string;
  }

  export const statusStyle = {
    draft: cn('bg-icon text-text-white'),
    passed: cn('bg-primary text-text-white'),
    failed: cn('bg-status-fail-light/80 text-status-fail'),
  };
}
