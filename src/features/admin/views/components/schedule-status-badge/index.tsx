import { useTranslation } from 'react-i18next';

import { cn } from '@/common/utils';

import type { ScheduleStatus } from '../../../viewmodels';

export function ScheduleStatusBadge({ status }: { status: ScheduleStatus }) {
  const { t } = useTranslation('admin');
  return (
    <span
      className={cn(
        'text-body rounded-full px-2.5 py-0.5 font-medium',
        status === 'ACTIVE' && 'bg-primary-light text-primary',
        status === 'COMPLETED' && 'bg-border text-text-secondary',
        status === 'DRAFT' && 'bg-border text-text-secondary',
        status === 'CANCELED' && 'bg-status-fail-light/80 text-status-fail',
      )}
    >
      {/* t('schedule.status.active') */}
      {/* t('schedule.status.completed') */}
      {/* t('schedule.status.draft') */}
      {/* t('schedule.status.canceled') */}
      {t(`schedule.status.${status.toLowerCase()}`)}
    </span>
  );
}
