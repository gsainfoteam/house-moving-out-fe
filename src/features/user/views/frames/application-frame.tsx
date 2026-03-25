import { useTranslation } from 'react-i18next';

import ModalBang from '@/assets/modal-bang.svg?react';
import ModalCheck from '@/assets/modal-check.svg?react';
import ModalX from '@/assets/modal-x.svg?react';
import { Button, Dialog } from '@/common/components';
import { overlay } from '@/common/lib';
import { useAuth } from '@/features/auth';

import { useApplicationForm } from '../../viewmodels';
import { ApplicationScreen } from '../screens';

export function ApplicationFrame() {
  const { user } = useAuth();
  const { t } = useTranslation('user');

  const openSuccessDialog = () =>
    overlay.open(() => (
      <Dialog.Root>
        <Dialog.Header>
          <ModalCheck className="mb-3" />
          <Dialog.Title>{t('application.dialog.success.title')}</Dialog.Title>
        </Dialog.Header>
        <Dialog.Footer>
          <Dialog.Close asChild>
            <Button variant="default" className="w-full">
              {t('application.dialog.success.button')}
            </Button>
          </Dialog.Close>
        </Dialog.Footer>
      </Dialog.Root>
    ));

  const openFullDialog = () =>
    overlay.open(() => (
      <Dialog.Root>
        <Dialog.Header>
          <ModalX className="mb-3" />
          <Dialog.Title>{t('application.dialog.full.title')}</Dialog.Title>
        </Dialog.Header>
        <Dialog.Footer>
          <Dialog.Close asChild>
            <Button variant="failed" className="w-full">
              {t('application.dialog.full.button')}
            </Button>
          </Dialog.Close>
        </Dialog.Footer>
      </Dialog.Root>
    ));

  const openUpdateDialog = () =>
    overlay.open(() => (
      <Dialog.Root>
        <Dialog.Header>
          <ModalCheck className="mb-3" />
          <Dialog.Title>{t('application.dialog.update.title')}</Dialog.Title>
        </Dialog.Header>
        <Dialog.Footer>
          <Dialog.Close asChild>
            <Button variant="default" className="w-full">
              {t('application.dialog.update.button')}
            </Button>
          </Dialog.Close>
        </Dialog.Footer>
      </Dialog.Root>
    ));

  const openModifyTimeRestrictedDialog = () =>
    overlay.open(() => (
      <Dialog.Root>
        <Dialog.Header>
          <ModalBang className="mb-3" />
          <Dialog.Title>{t('application.dialog.modifyCooldown.title')}</Dialog.Title>
        </Dialog.Header>
        <Dialog.Footer>
          <Dialog.Close asChild>
            <Button variant="failed" className="w-full">
              {t('application.dialog.modifyCooldown.button')}
            </Button>
          </Dialog.Close>
        </Dialog.Footer>
      </Dialog.Root>
    ));

  const {
    form: { formState, watch, setValue },
    days,
    isLoading,
    inspectionDayTimestamp,
    selectedDaySlots,
    onSubmit,
  } = useApplicationForm({
    applyInspection: {
      onSuccess: openSuccessDialog,
      onFull: openFullDialog,
    },
    updateInspection: {
      onSuccess: openUpdateDialog,
      onFull: openFullDialog,
      onModifyTimeRestricted: openModifyTimeRestrictedDialog,
    },
  });

  const selectedSlotUuid = watch('inspectionSlotUuid');

  if (!user) return null;

  return (
    <ApplicationScreen
      isLoading={isLoading}
      days={days}
      inspectionDayTimestamp={inspectionDayTimestamp}
      selectedDaySlots={selectedDaySlots}
      selectedSlotUuid={selectedSlotUuid}
      onDayChange={(day) => {
        setValue('inspectionDayTimestamp', day.valueOf());
        setValue('inspectionSlotUuid', null);
      }}
      onSlotChange={(slot) => {
        setValue('inspectionSlotUuid', slot.uuid);
      }}
      isSubmitDisabled={!formState.isValid}
      onSubmit={async () => {
        await onSubmit();
      }}
    />
  );
}
