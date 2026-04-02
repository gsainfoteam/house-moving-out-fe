import React from 'react';

import { useParams } from '@tanstack/react-router';

import dayjs from 'dayjs';
import { isNil, range } from 'es-toolkit';
import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button, Checkbox, Loading } from '@/common/components';
import { cn } from '@/common/utils';

import { InspectionType, useManageCleaningService, useTargets } from '../../viewmodels';

export function TargetListFrame() {
  const { uuid } = useParams({ from: '/_auth-required/admin/schedules/$uuid/targets' });
  const { data: targets, error } = useTargets(uuid);
  const { t } = useTranslation('admin');
  const {
    isEditable,
    numberOfDraftChanges,
    isSaving,
    handleResetChanges,
    handleCleaningServiceChange,
    handleRepairChange,
    handleSaveChanges,
    isDraftCleaning,
    isDraftRepair,
  } = useManageCleaningService(uuid);

  if (error) return <div>{t('target.error.load')}</div>;
  if (!targets) return <Loading containerClassName="h-full" />;
  return (
    <main className="p-4">
      <div className="bg-bg border-border overflow-hidden rounded-xl border">
        {isEditable ? (
          <div className="border-border flex items-center justify-between border-b px-4 py-3">
            <span className="text-body text-text-secondary">
              {numberOfDraftChanges
                ? t('target.detail.unsavedCount', {
                    count: numberOfDraftChanges,
                  })
                : t('target.detail.noChanges')}
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="default"
                disabled={!numberOfDraftChanges || isSaving}
                onClick={handleResetChanges}
              >
                {t('target.action.resetCleaningChanges')}
              </Button>
              <Button
                variant="default"
                size="default"
                disabled={!numberOfDraftChanges || !isEditable || isSaving}
                onClick={() => {
                  void handleSaveChanges();
                }}
              >
                {isSaving
                  ? t('target.action.savingCleaningChanges')
                  : t('target.action.saveCleaningChanges')}
              </Button>
            </div>
          </div>
        ) : null}
        <table className="[&_td,&_th]:border-border w-full text-center [&_td,&_th]:border [&_td,&_th]:px-3 [&_td,&_th]:py-2">
          <thead>
            <tr className="bg-bg-surface/80 [&_th]:text-text-primary [&_th]:font-medium">
              <th className="[&&]:border-r-2">{t('target.detail.roomNumber')}</th>
              <th>{t('target.detail.studentId')}</th>
              <th>{t('target.detail.name')}</th>
              <th>{t('target.detail.studentId')}</th>
              <th>{t('target.detail.name')}</th>
              <th>{t('target.detail.studentId')}</th>
              <th>{t('target.detail.name')}</th>
              <th>{t('target.detail.type')}</th>
              <th>{t('target.detail.cleaningService')}</th>
              <th>{t('target.detail.repairAfterMoveOut')}</th>
              <th>{t('target.detail.result')}</th>
              <th>{t('target.detail.lastInspection')}</th>
              <th>{t('target.detail.inspectionCount')}</th>
            </tr>
          </thead>
          <tbody>
            {targets
              .filter((t) => t.inspectionType !== InspectionType.EMPTY)
              .map((target) => {
                return (
                  <tr key={target.roomNumber}>
                    <td className={cn('[&&]:border-r-2')}>{target.roomNumber}</td>
                    {range(3)
                      .map((index) => target.residents[index])
                      .map((s, index) =>
                        s ? (
                          <React.Fragment key={s.studentNumber}>
                            <td>{s.studentNumber}</td>
                            <td>{s.name}</td>
                          </React.Fragment>
                        ) : (
                          <td colSpan={2} key={index} />
                        ),
                      )}
                    <td>
                      {target.inspectionType === InspectionType.FULL
                        ? t('type.all')
                        : t('type.individual')}
                    </td>
                    <td>
                      <div className="flex items-center justify-center gap-2">
                        {isEditable ? (
                          <Checkbox
                            className="scale-100"
                            checked={isDraftCleaning(target.uuid) ?? target.applyCleaningService}
                            onChange={(event) => {
                              handleCleaningServiceChange(
                                target.uuid,
                                event.target.checked,
                                target.applyCleaningService,
                              );
                            }}
                            disabled={!isEditable || isSaving}
                            aria-label={t('target.detail.cleaningService')}
                          />
                        ) : target.applyCleaningService ? (
                          <Check
                            className="text-primary size-5"
                            aria-label={t('target.detail.cleaningService')}
                          />
                        ) : null}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center justify-center gap-2">
                        {isEditable ? (
                          <Checkbox
                            className="scale-100"
                            checked={isDraftRepair(target.uuid) ?? target.applyRepairCheck}
                            onChange={(event) => {
                              handleRepairChange(
                                target.uuid,
                                event.target.checked,
                                target.applyRepairCheck,
                              );
                            }}
                            disabled={!isEditable || isSaving}
                            aria-label={t('target.detail.repairAfterMoveOut')}
                          />
                        ) : target.applyRepairCheck ? (
                          <Check
                            className="text-primary size-5"
                            aria-label={t('target.detail.repairAfterMoveOut')}
                          />
                        ) : null}
                      </div>
                    </td>
                    <td>
                      {isNil(target.status) ? '-' : t(`result.${target.status.toLowerCase()}`)}
                    </td>
                    <td>
                      {target.lastInspectionTime
                        ? dayjs(target.lastInspectionTime).format('YYYY-MM-DD HH:mm')
                        : '-'}
                    </td>
                    <td>{target.inspectionCount}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
