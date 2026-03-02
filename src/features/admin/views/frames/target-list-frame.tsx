import React from 'react';

import { useParams } from '@tanstack/react-router';

import dayjs from 'dayjs';
import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button, Checkbox, Loading } from '@/common/components';
import { cn } from '@/common/utils';

import { InspectionType } from '../../models';
import { useManageCleaningService, useTargets } from '../../viewmodels';

// NOTE: https://ziggle.gistory.me/ko/notice/197993

// prettier-ignore
const threeRooms = [
  'G301', 'G302', 'G401', 'G402', 'G413', 'G414', 'G501', 'G502', 'G513', 'G514', 'G601', 'G602', 'G613', 'G614',
  'I318', 'I319', 'I406', 'I407', 'I418', 'I419', 'I506', 'I507', 'I518', 'I519', 'I606', 'I607', 'I618', 'I619',
];

export function TargetListFrame() {
  const { uuid } = useParams({ from: '/_auth-required/admin/schedules/$uuid/targets' });
  const { data: targets, error } = useTargets(uuid);
  const { t } = useTranslation('admin');
  const {
    isCleaningEditable,
    numberOfDraftChanges,
    isSaving,
    handleResetCleaningChanges,
    handleCleaningServiceChange,
    handleSaveCleaningChanges,
    isDraftCleaning,
  } = useManageCleaningService(uuid);

  if (error) return <div>{t('target.error.load')}</div>;
  if (!targets) return <Loading containerClassName="h-full" />;
  return (
    <main className="p-4">
      <div className="bg-bg-white overflow-hidden rounded-xl border border-gray-200 shadow-sm">
        {isCleaningEditable ? (
          <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
            <span className="text-box2 text-text-gray">
              {numberOfDraftChanges
                ? t('target.detail.cleaningUnsavedCount', {
                    count: numberOfDraftChanges,
                  })
                : t('target.detail.cleaningNoChanges')}
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="default"
                disabled={!numberOfDraftChanges || isSaving}
                onClick={handleResetCleaningChanges}
              >
                {t('target.action.resetCleaningChanges')}
              </Button>
              <Button
                variant="default"
                size="default"
                disabled={!numberOfDraftChanges || !isCleaningEditable || isSaving}
                onClick={() => {
                  void handleSaveCleaningChanges();
                }}
              >
                {isSaving
                  ? t('target.action.savingCleaningChanges')
                  : t('target.action.saveCleaningChanges')}
              </Button>
            </div>
          </div>
        ) : null}
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
                    {isCleaningEditable ? (
                      <Checkbox
                        className="scale-150"
                        checked={isDraftCleaning(target.uuid) ?? target.applyCleaningService}
                        onChange={(event) => {
                          handleCleaningServiceChange(
                            target.uuid,
                            event.target.checked,
                            target.applyCleaningService,
                          );
                        }}
                        disabled={!isCleaningEditable || isSaving}
                        aria-label={t('target.detail.cleaningService')}
                      />
                    ) : target.applyCleaningService ? (
                      <Check
                        className="text-primary-main size-5"
                        aria-label={t('target.detail.cleaningService')}
                      />
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
