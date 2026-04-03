import { useMemo, useTransition } from 'react';

import { isNotNil, keyBy, mapValues } from 'es-toolkit';
import { useTranslation } from 'react-i18next';

import { Button, Dialog } from '@/common/components';
import { overlay } from '@/common/lib';
import {
  useChangeInspector,
  useInspectorsOfSchedule,
  type Application,
} from '@/features/admin/viewmodels';

function ChangeFullDialog() {
  return <Dialog.Root></Dialog.Root>;
}

function ChangeConfirmDialog({
  confirmChange,
  close,
  name,
}: {
  confirmChange: () => Promise<void>;
  close: () => void;
  name: string;
}) {
  const { t } = useTranslation('admin');
  const [loading, startLoading] = useTransition();
  return (
    <Dialog.Root>
      <Dialog.Header>
        <Dialog.Title>{t('application.detail.changeInspector.title')}</Dialog.Title>
      </Dialog.Header>
      <Dialog.Body>
        <Dialog.Description>
          {t('application.detail.changeInspector.description', { name })}
        </Dialog.Description>
      </Dialog.Body>
      <Dialog.Footer>
        <Dialog.Close asChild>
          <Button disabled={loading}>{t('application.detail.changeInspector.cancel')}</Button>
        </Dialog.Close>
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
      </Dialog.Footer>
    </Dialog.Root>
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
  const inspectorFullMap = useMemo(
    () =>
      mapValues(
        keyBy(availableInspectors, (i) => i.uuid),
        (i) => i.slot.reservedCount >= i.slot.capacity,
      ),
    [availableInspectors],
  );
  const inspectorNameMap = useMemo(
    () =>
      mapValues(
        keyBy(availableInspectors, (i) => i.uuid),
        (i) => i.name,
      ),
    [availableInspectors],
  );

  return (
    <select
      value={application.inspector.uuid}
      onChange={(e) => {
        const inspectorUuid = e.target.value;
        return overlay.open(({ close }) =>
          inspectorFullMap[inspectorUuid] ? (
            <ChangeFullDialog />
          ) : (
            <ChangeConfirmDialog
              close={close}
              name={inspectorNameMap[inspectorUuid]}
              confirmChange={() =>
                changeInspector?.({
                  params: { path: { uuid: application.uuid } },
                  body: { inspectorUuid },
                })
              }
            />
          ),
        );
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
