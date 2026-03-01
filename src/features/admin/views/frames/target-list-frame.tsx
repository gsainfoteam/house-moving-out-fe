import React from 'react';

import { useParams } from '@tanstack/react-router';

import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import { Checkbox, Loading } from '@/common/components';
import { cn } from '@/common/utils';

import { InspectionType, ScheduleStatus } from '../../models';
import { useBulkUpdateCleaningService, useGetMoveOutScheduleQuery, useTargets } from '../../viewmodels';

// NOTE: https://ziggle.gistory.me/ko/notice/197993

const threeRooms = [
  'G301',
  'G302',
  'G401',
  'G402',
  'G413',
  'G414',
  'G501',
  'G502',
  'G513',
  'G514',
  'G601',
  'G602',
  'G613',
  'G614',
  'I318',
  'I319',
  'I406',
  'I407',
  'I418',
  'I419',
  'I506',
  'I507',
  'I518',
  'I519',
  'I606',
  'I607',
  'I618',
  'I619',
];

export function TargetListFrame() {
  const { uuid } = useParams({ from: '/admin/schedules/$uuid/targets' });
  const { data: targets, error } = useTargets(uuid);
  const { data: schedule } = useGetMoveOutScheduleQuery(uuid);
  const bulkUpdateCleaningService = useBulkUpdateCleaningService();
  const [processingTargetUuid, setProcessingTargetUuid] = React.useState<string | null>(null);
  const { t } = useTranslation('admin');
  const isCleaningEditable = schedule != null && schedule.status !== ScheduleStatus.ACTIVE;

  const handleCleaningServiceChange = (targetUuid: string, applyCleaningService: boolean) => {
    if (!isCleaningEditable) return;

    setProcessingTargetUuid(targetUuid);
    bulkUpdateCleaningService.mutate(
      {
        params: {
          path: { uuid },
        },
        body: {
          targetUuids: [targetUuid],
          applyCleaningService,
        },
      },
      {
        onSettled: () => {
          setProcessingTargetUuid((current) => (current === targetUuid ? null : current));
        },
      },
    );
  };

  if (error) return <div>{t('target.error.load')}</div>;
  if (!targets) return <Loading containerClassName="h-full" />;
  return (
    <main className="p-4">
      <div className="bg-bg-white overflow-hidden rounded-xl border border-gray-200 shadow-sm">
        <table className="w-full text-center [&_td,&_th]:border [&_td,&_th]:border-gray-200 [&_td,&_th]:px-3 [&_td,&_th]:py-2">
          <thead>
            <tr className="bg-bg-surface/80 [&_th]:text-text-black [&_th]:font-medium">
              <th className="[&&]:border-r-2">{t('target.detail.roomNumber')}</th>
              <th>{t('target.detail.admissionYear')}</th>
              <th>{t('target.detail.name')}</th>
              <th>{t('target.detail.admissionYear')}</th>
              <th>{t('target.detail.name')}</th>
              <th>{t('target.detail.admissionYear')}</th>
              <th>{t('target.detail.name')}</th>
              <th>{t('target.detail.type')}</th>
              <th>{t('target.detail.cleaningService')}</th>
              <th>{t('target.detail.result')}</th>
              <th>{t('target.detail.lastInspection')}</th>
              <th>{t('target.detail.inspectionCount')}</th>
            </tr>
          </thead>
          <tbody>
            {targets.map((target) => (
              <tr key={target.roomNumber}>
                <td
                  className={cn(
                    '[&&]:border-r-2',
                    threeRooms.includes(target.roomNumber) && 'bg-yellow-200',
                  )}
                >
                  {target.roomNumber}
                </td>
                {[...target.residents, null, null, null].slice(0, 3).map((s, index) =>
                  s ? (
                    <React.Fragment key={index}>
                      <td className={cn(s.admissionYear.search(/^[0-9]+$/) === -1 && 'bg-red-200')}>
                        {s.admissionYear}
                      </td>
                      <td>{s.name}</td>
                    </React.Fragment>
                  ) : (
                    <td colSpan={2} key={index} />
                  ),
                )}
                <td>
                  {target.inspectionType === InspectionType.EMPTY
                    ? ''
                    : target.inspectionType === InspectionType.FULL
                      ? t('type.all')
                      : t('type.individual')}
                </td>
                <td>
                  <div className="flex items-center justify-center gap-2">
                    <Checkbox
                      checked={target.applyCleaningService}
                      onChange={(event) => {
                        handleCleaningServiceChange(target.uuid, event.target.checked);
                      }}
                      disabled={
                        !isCleaningEditable ||
                        (bulkUpdateCleaningService.isPending && processingTargetUuid === target.uuid)
                      }
                      aria-label={t('target.detail.cleaningService')}
                    />
                    {bulkUpdateCleaningService.isPending && processingTargetUuid === target.uuid ? (
                      <span className="text-primary-main text-xs">{t('target.detail.cleaningUpdating')}</span>
                    ) : null}
                  </div>
                </td>
                <td>
                  {target.isPassed === null
                    ? '-'
                    : target.isPassed
                      ? t('result.passed')
                      : t('result.failed')}
                </td>
                <td>
                  {target.lastInspectionTime
                    ? dayjs(target.lastInspectionTime).format('YYYY-MM-DD HH:mm')
                    : '-'}
                </td>
                <td>{target.inspectionCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
