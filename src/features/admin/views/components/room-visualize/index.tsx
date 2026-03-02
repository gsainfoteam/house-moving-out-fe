import React from 'react';

import { useParams } from '@tanstack/react-router';

import { range } from 'es-toolkit';
import { useTranslation } from 'react-i18next';

import { Loading } from '@/common/components';
import { cn } from '@/common/utils';

import { InspectionType, type Target } from '../../../models';
import { useTargets } from '../../../viewmodels';

const config = {
  G: [19, 19, 19, 19, 19, 19],
  I: [19, 19, 19, 19, 19, 19],
  S: [0, 18, 18, 18, 17, 17],
  T: [22, 22, 22, 21, 21, 21],
};

const cellBase = cn(
  'border border-icon-light-gray transition-colors duration-150 min-w-18 px-2 py-1.5 bg-bg-surface/60',
);
const roomHeaderCell = cn(
  'bg-bg-surface/80 text-text-black text-box2 font-medium text-center tabular-nums',
);
const statusCell = cn('text-box2 text-center font-medium');

type Status =
  | 'disabled'
  | 'passed'
  | 'failed'
  | 'not_inspected'
  | 'will_be_cleaned'
  | 'single'
  | 'single_passed';

const statusStyles: Record<Status, string> = {
  disabled: cn('bg-status-inactive text-text-gray'),
  passed: cn('bg-icon-green text-text-black'),
  failed: cn('bg-icon-red text-text-black'),
  not_inspected: cn('bg-icon-red text-text-black'),
  will_be_cleaned: cn('bg-status-progress text-text-white'),
  single: cn('bg-icon-red text-text-black'),
  single_passed: cn('bg-status-pending text-text-black'),
};

const getStatus = (target: Target | undefined): Status | undefined => {
  if (!target) return undefined;
  if (target.applyCleaningService) return 'will_be_cleaned';
  if (target.inspectionType === InspectionType.EMPTY) return 'disabled';
  if (target.isPassed) {
    if (target.inspectionType === InspectionType.FULL) return 'passed';
    return 'single_passed';
  }
  if (target.isPassed === false) return 'failed';
  if (target.inspectionType === InspectionType.FULL) return 'not_inspected';
  return 'single';
};

export function RoomVisualize() {
  const { uuid } = useParams({ from: '/_auth-required/admin/schedules/$uuid' });
  const { data: targets, error } = useTargets(uuid);
  const { t } = useTranslation('admin');

  if (error) return <div>{t('target.error.load')}</div>;
  if (!targets) return <Loading containerClassName="h-full" />;

  return (
    <table className="text-box2 bg-bg-white w-full border-collapse">
      {Object.entries(config).map(([house, counts], configIndex) => (
        <tbody key={house}>
          <tr>
            <th className={cn(cellBase)} rowSpan={Math.max(...counts) + 1}>
              {house}
            </th>
            {range(1, 7).map((floor) => (
              <th key={floor} className={cn(cellBase, roomHeaderCell)} scope="col" colSpan={2}>
                {t('floor', { count: floor })}
              </th>
            ))}
          </tr>
          {range(1, Math.max(...counts) + 1).map((roomIndex) => (
            <tr key={roomIndex}>
              {range(1, 7).map((floor) => {
                if (counts[floor - 1] < roomIndex)
                  return (
                    <React.Fragment key={floor}>
                      <th className={cn(cellBase, roomHeaderCell)} />
                      <td className={cn(cellBase)} aria-hidden />
                    </React.Fragment>
                  );
                const roomNumber = `${house}${floor}${roomIndex.toString().padStart(2, '0')}`;
                const target = targets.find((t) => t.roomNumber === roomNumber);
                const status = getStatus(target);
                // t('status.disabled')
                // t('status.passed')
                // t('status.failed')
                // t('status.not_inspected')
                // t('status.will_be_cleaned')
                // t('status.single')
                // t('status.single_passed')
                return (
                  <React.Fragment key={floor}>
                    <th className={cn(cellBase, roomHeaderCell)} scope="row" title={roomNumber}>
                      {roomNumber}
                    </th>
                    {status ? (
                      <td
                        className={cn(cellBase, statusCell, statusStyles[status])}
                        title={t(`status.${status}`)}
                      >
                        {t(`status.${status}`)}
                      </td>
                    ) : (
                      <td className={cn(cellBase, statusCell)} />
                    )}
                  </React.Fragment>
                );
              })}
            </tr>
          ))}
          {configIndex !== Object.entries(config).length - 1 && (
            <tr>
              <td colSpan={13} className="bg-bg-surface h-2 border-none" />
            </tr>
          )}
        </tbody>
      ))}
    </table>
  );
}
