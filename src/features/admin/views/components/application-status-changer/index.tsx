import { useState, useTransition } from 'react';

import { isNil } from 'es-toolkit';
import { useTranslation } from 'react-i18next';

import { Button, Dialog } from '@/common/components';
import { overlay, useOverlayContext } from '@/common/lib';
import { cn } from '@/common/utils';
import { useChangeApplicationStatus, type Application } from '@/features/admin/viewmodels';

import { STATUS_OPTIONS } from '../../types/status';

function ChangeStatusConfirmDialog({
  application,
  status,
}: {
  application: Application;
  status: NonNullable<(typeof STATUS_OPTIONS)[number]['status']>;
}) {
  const { t } = useTranslation('admin');
  const [loading, startLoading] = useTransition();
  const [additionalComment, setAdditionalComment] = useState(application.additionalComment ?? '');
  const { mutateAsync: changeApplicationStatus } = useChangeApplicationStatus();
  const { close } = useOverlayContext();

  const handleClose = () => {
    close();
  };

  const statusLabel = isNil(status)
    ? t('application.detail.changeStatus.unprocessed')
    : t(`result.${status.toLowerCase()}`);

  return (
    <>
      <Dialog.Header>
        <Dialog.Title>{t('application.detail.changeStatus.title')}</Dialog.Title>
        <Dialog.Description>
          {t('application.detail.changeStatus.description', {
            roomNumber: application.targetInfo.roomNumber,
            status: statusLabel,
          })}
        </Dialog.Description>
      </Dialog.Header>
      <Dialog.Body>
        <label className="text-body text-text-primary flex flex-col gap-2">
          {t('application.detail.changeStatus.commentLabel')}
          <textarea
            className={cn(
              'bg-bg w-full rounded-lg border-[1.5px] px-4 py-3',
              'text-body-lg text-text-primary placeholder:text-text-secondary',
              'focus-visible:border-primary focus-visible:ring-primary focus-visible:ring-2 focus-visible:outline-none',
              'border-icon',
            )}
            rows={4}
            value={additionalComment}
            onChange={(e) => setAdditionalComment(e.target.value)}
            placeholder={t('application.detail.changeStatus.commentPlaceholder')}
          />
        </label>
      </Dialog.Body>
      <Dialog.Footer>
        <Dialog.Close asChild>
          <Button variant="subtle" disabled={loading} onClick={handleClose}>
            {t('application.detail.changeStatus.cancel')}
          </Button>
        </Dialog.Close>
        <Button
          className="w-full"
          disabled={loading || additionalComment.trim().length === 0}
          onClick={() =>
            startLoading(() =>
              changeApplicationStatus({
                params: { path: { uuid: application.uuid } },
                body: { status, additionalComment: additionalComment.trim() },
              })
                .catch(() => {})
                .then(close),
            )
          }
        >
          {t('application.detail.changeStatus.submit')}
        </Button>
      </Dialog.Footer>
    </>
  );
}

export function ApplicationStatusChanger({ application }: { application: Application }) {
  const { t } = useTranslation('admin');

  return (
    <select
      className="mx-auto"
      value={application.status}
      onChange={(e) => {
        const nextValue = e.target.value;
        const option = STATUS_OPTIONS.find((item) => item.value === nextValue);
        if (!option) return;
        const status = option.status;
        if (isNil(status)) return;

        overlay.open(() => (
          <Dialog.Root>
            <ChangeStatusConfirmDialog application={application} status={status} />
          </Dialog.Root>
        ));
      }}
    >
      {STATUS_OPTIONS.map((option) => (
        <option
          value={option.value}
          key={option.value || 'unprocessed'}
          disabled={option.status === null}
        >
          {!option.value
            ? t('application.detail.changeStatus.unprocessed')
            : t(`result.${option.value.toLowerCase()}`)}
        </option>
      ))}
    </select>
  );
}
