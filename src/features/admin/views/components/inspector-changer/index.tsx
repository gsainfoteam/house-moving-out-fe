import { useMemo, useTransition } from 'react';

import { isNotNil, keyBy } from 'es-toolkit';
import { useTranslation } from 'react-i18next';

import { Button, Dialog, Loading } from '@/common/components';
import { overlay, useOverlayContext } from '@/common/lib';
import { cn } from '@/common/utils';
import {
  useApplicationsWithInspectorAndSlot,
  useChangeInspector,
  useInspectorsOfSchedule,
  type Application,
  type Inspector,
  type InspectionSlot,
} from '@/features/admin/viewmodels';

function ChangeConfirmDialog({
  confirmChange,
  inspector,
  scheduleUuid,
  application,
  slot,
}: {
  confirmChange: (targetApplicationUuid?: string) => Promise<void>;
  inspector: Inspector;
  application: Application;
  slot: InspectionSlot;
  scheduleUuid: string;
}) {
  const { t } = useTranslation('admin');
  const [loading, startLoading] = useTransition();
  const { data: applications, error } = useApplicationsWithInspectorAndSlot(
    scheduleUuid,
    inspector.uuid,
    slot.uuid,
  );
  const { close } = useOverlayContext();

  if (error) return <div>{t('application.error.load')}</div>;
  if (!applications) return <Loading containerClassName="h-full" />;

  const isFull = applications.applications.length >= 2;

  return (
    <>
      <Dialog.Header>
        <Dialog.Title>{t('application.detail.changeInspector.title')}</Dialog.Title>
      </Dialog.Header>
      <Dialog.Body>
        <Dialog.Description>
          {isFull
            ? t('application.detail.changeInspector.fullDescription', {
                name: inspector.name,
                previous: application.inspector.name,
              })
            : t('application.detail.changeInspector.description', { name: inspector.name })}
        </Dialog.Description>
      </Dialog.Body>
      <Dialog.Footer className={cn(isFull && 'flex-col')}>
        <Dialog.Close asChild>
          <Button disabled={loading}>{t('application.detail.changeInspector.cancel')}</Button>
        </Dialog.Close>
        {isFull ? (
          applications.applications.map((a) => (
            <Button
              key={a.uuid}
              disabled={loading}
              onClick={() =>
                startLoading(() =>
                  confirmChange(a.uuid)
                    .catch(() => {})
                    .then(close),
                )
              }
            >
              {t('application.detail.changeInspector.reassign', {
                roomNumber: a.targetInfo.roomNumber,
              })}
            </Button>
          ))
        ) : (
          <Button
            className="w-full"
            variant="failed"
            disabled={loading}
            onClick={() =>
              startLoading(() =>
                confirmChange()
                  .catch(() => {})
                  .then(close),
              )
            }
          >
            {t('application.detail.changeInspector.submit')}
          </Button>
        )}
      </Dialog.Footer>
    </>
  );
}

export function InspectorChanger({
  scheduleUuid,
  application,
}: {
  scheduleUuid: string;
  application: Application;
}) {
  const { data: inspectors } = useInspectorsOfSchedule(scheduleUuid);
  const { mutateAsync: changeInspector } = useChangeInspector();
  const availableInspectors = useMemo(
    () =>
      inspectors
        ?.map((i) => ({
          ...i,
          slot: i.availableSlots.find((s) => s.uuid === application.inspectionSlot.uuid),
        }))
        .filter((i): i is { [K in keyof typeof i]: NonNullable<(typeof i)[K]> } =>
          isNotNil(i.slot),
        ) ?? [],
    [inspectors, application.inspectionSlot.uuid],
  );
  const inspectorMap = useMemo(
    () => keyBy(availableInspectors, (i) => i.uuid),
    [availableInspectors],
  );

  return (
    <select
      value={application.inspector.uuid}
      onChange={(e) => {
        const inspectorUuid = e.target.value;
        const inspector = inspectorMap[inspectorUuid];
        if (!inspector) return;
        return overlay.open(() => (
          <Dialog.Root>
            <ChangeConfirmDialog
              application={application}
              scheduleUuid={scheduleUuid}
              inspector={inspector}
              slot={inspector.slot}
              confirmChange={(targetApplicationUuid) =>
                changeInspector?.({
                  params: { path: { uuid: application.uuid } },
                  body: { inspectorUuid, targetApplicationUuid },
                })
              }
            />
          </Dialog.Root>
        ));
      }}
      disabled={!changeInspector}
    >
      {availableInspectors?.map((i) => (
        <option value={i.uuid} key={i.uuid}>
          {i.name}
        </option>
      ))}
    </select>
  );
}
