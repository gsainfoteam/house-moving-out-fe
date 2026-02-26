import { Link } from '@tanstack/react-router';

import dayjs from 'dayjs';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import ModalBang from '@/assets/modal-bang.svg?react';
import ModalCheck from '@/assets/modal-check.svg?react';
import ModalX from '@/assets/modal-x.svg?react';
import { Button, Checkbox, Dialog, LayoutCard } from '@/common/components';
import { overlay } from '@/common/lib';
import { cn } from '@/common/utils';
import { useLoading } from '@/common/viewmodels';
import { useAuth } from '@/features/auth';

import { useApplicationForm, useNoticeConsentForm } from '../../viewmodels';
import { DateSelect, TimeSelect } from '../components';

function NoticeConsentDialog({ onConfirm }: { onConfirm: () => Promise<void> }) {
  const { t } = useTranslation('user');
  const [isSubmitting, startLoading] = useLoading();

  const items = Object.values(
    t('application.dialog.notice.items', { returnObjects: true }) as Record<string, string>,
  );
  const { register, isValid, valuesByIndex } = useNoticeConsentForm(items);

  return (
    <Dialog.Root closeOnBackdrop>
      <Dialog.Header>
        <Dialog.Title>{t('application.dialog.notice.title')}</Dialog.Title>
        <Dialog.Description>{t('application.dialog.notice.description')}</Dialog.Description>
      </Dialog.Header>
      <Dialog.Body>
        <ul className="flex flex-col gap-2">
          {items.map((item, index) => (
            <li
              key={index}
              className={cn(
                'rounded-lg px-3 py-2.5 transition-colors',
                valuesByIndex[index] ? 'bg-primary-main/10' : 'bg-bg-surface/30',
              )}
            >
              <label className="text-box2 text-text-black flex cursor-pointer items-start gap-2 leading-normal">
                <Checkbox {...register(String(index))} className="mt-0.5 shrink-0" />
                {item}
              </label>
            </li>
          ))}
        </ul>
      </Dialog.Body>
      <Dialog.Footer>
        <Button
          variant="default"
          className="w-full"
          disabled={!isValid || isSubmitting}
          onClick={() => startLoading(onConfirm)}
        >
          {t('application.dialog.notice.button')}
        </Button>
      </Dialog.Footer>
    </Dialog.Root>
  );
}

export function ApplicationFrame() {
  const { t } = useTranslation('user');
  const { user } = useAuth();

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
    form: { control, formState, setValue },
    inspectionDays,
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
      onModifyTimeRestricted: openModifyTimeRestrictedDialog,
      onSuccess: openUpdateDialog,
      onFull: openFullDialog,
    },
  });

  if (!user) return null;

  return (
    <LayoutCard.Root isLoading={isLoading}>
      <LayoutCard.Header>
        <LayoutCard.Text>
          <LayoutCard.Title className="text-primary-main">
            {t('application.title')}
          </LayoutCard.Title>
          <LayoutCard.Description>{t('application.description')}</LayoutCard.Description>
        </LayoutCard.Text>
      </LayoutCard.Header>
      <LayoutCard.Body>
        <div className="h-full w-full">
          <Controller
            control={control}
            name="inspectionDayTimestamp"
            render={({ field }) => (
              <DateSelect
                days={inspectionDays}
                value={field.value != null ? dayjs(field.value).startOf('day') : null}
                onChange={(day) => {
                  field.onChange(day.valueOf());
                  setValue('inspectionSlotUuid', null);
                }}
              />
            )}
          />
          {inspectionDayTimestamp != null && (
            <Controller
              control={control}
              name="inspectionSlotUuid"
              render={({ field }) => (
                <div className="mt-6 grid grid-cols-3 gap-2">
                  {selectedDaySlots.map((slot) => (
                    <TimeSelect
                      key={slot.uuid}
                      slot={slot}
                      value={field.value}
                      onChange={(s) => field.onChange(s.uuid)}
                    />
                  ))}
                </div>
              )}
            />
          )}
        </div>
      </LayoutCard.Body>
      <LayoutCard.Footer className="mt-auto">
        <Button variant="outline" asChild>
          <Link to="/">{t('application.button.cancel')}</Link>
        </Button>
        <Button
          variant="default"
          className="w-full"
          disabled={!formState.isValid}
          onClick={() =>
            overlay.open(({ close }) => (
              <NoticeConsentDialog onConfirm={() => onSubmit().then(() => close())} />
            ))
          }
        >
          {t('application.button.next')}
        </Button>
      </LayoutCard.Footer>
    </LayoutCard.Root>
  );
}
