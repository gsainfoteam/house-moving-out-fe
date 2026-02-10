import { useTranslation } from 'react-i18next';

import { cn } from '@/common/utils';

import type { ScheduleStatus } from '../../models';

export function ScheduleStatusBadge({ status }: { status: ScheduleStatus }) {
  const { t } = useTranslation('admin');
  return (
    <span
      className={cn(
        'text-box2 rounded-full px-2.5 py-0.5 font-medium',
        status === 'ACTIVE' && 'bg-bg-green text-primary-main',
        status === 'COMPLETED' && 'bg-icon-light-gray text-text-gray',
        status === 'DRAFT' && 'bg-icon-light-gray text-text-gray',
        status === 'CANCELED' && 'bg-icon-red/80 text-status-fail',
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
