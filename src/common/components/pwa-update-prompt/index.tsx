import { useEffect, useRef } from 'react';

import { useTranslation } from 'react-i18next';
import { useRegisterSW } from 'virtual:pwa-register/react';

import { overlay } from '@/common/lib';

import { Dialog } from '../dialog';
import { Button } from '../ui';

export function UpdateDialog({
  updateServiceWorker,
  onDismiss,
}: {
  updateServiceWorker: () => Promise<void>;
  onDismiss: () => void;
}) {
  const { t } = useTranslation('common');

  return (
    <Dialog.Root closeOnBackdrop={false} closeOnEscape={false}>
      <Dialog.Header>
        <Dialog.Title>{t('pwaUpdate.title')}</Dialog.Title>
        <Dialog.Description>{t('pwaUpdate.description')}</Dialog.Description>
      </Dialog.Header>
      <Dialog.Footer>
        <Dialog.Close asChild>
          <Button variant="outline" onClick={onDismiss}>
            {t('pwaUpdate.dismiss')}
          </Button>
        </Dialog.Close>
        <Dialog.Close asChild>
          <Button onClick={updateServiceWorker}>{t('pwaUpdate.update')}</Button>
        </Dialog.Close>
      </Dialog.Footer>
    </Dialog.Root>
  );
}

export function PwaUpdatePrompt() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  const overlayIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!needRefresh) return;
    if (overlayIdRef.current !== null && overlay.isOpen(overlayIdRef.current)) return;

    overlayIdRef.current = overlay.open(() => (
      <UpdateDialog
        updateServiceWorker={updateServiceWorker}
        onDismiss={() => setNeedRefresh(false)}
      />
    ));
  }, [needRefresh, setNeedRefresh, updateServiceWorker]);

  return null;
}
