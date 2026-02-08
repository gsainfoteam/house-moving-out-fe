import { useState } from 'react';

import { Link } from '@tanstack/react-router';

import dayjs from 'dayjs';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import ModalBang from '@/assets/modal-bang.svg?react';
import ModalCheck from '@/assets/modal-check.svg?react';
import ModalX from '@/assets/modal-x.svg?react';
import { Button, Dialog, LayoutCard } from '@/common/components';
import { useAuth } from '@/features/auth';

import { useApplicationForm } from '../../viewmodels';
import { DateSelect, TimeSelect } from '../components';

export function ApplicationFrame() {
  const { t } = useTranslation('user');
  const { user } = useAuth();

  const [noticeDialogOpen, setNoticeDialogOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [fullDialogOpen, setFullDialogOpen] = useState(false);
  const [modifyTimeRestrictedDialogOpen, setModifyTimeRestrictedDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);

  const {
    form: { control, formState, setValue },
    inspectionDays,
    isLoading,
    inspectionDayTimestamp,
    selectedDaySlots,
    onSubmit,
  } = useApplicationForm({
    applyInspection: {
      onSuccess: () => setSuccessDialogOpen(true),
      onFull: () => setFullDialogOpen(true),
    },
    updateInspection: {
      onModifyTimeRestricted: () => setModifyTimeRestrictedDialogOpen(true),
      onSuccess: () => setUpdateDialogOpen(true),
      onFull: () => setFullDialogOpen(true),
    },
  });

  if (!user) return null;

  return (
    <>
      <div className="bg-bg-surface h-dvh px-5 py-6">
        <div className="mx-auto flex h-full w-full max-w-100 flex-col gap-5">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="text-h1 text-text-black font-bold">
                {t('header.title', { ns: 'common', name: user.name })}
              </h1>
              <h2 className="text-sub text-text-gray">
                {user.roomNumber
                  ? t('header.subtitle.room', {
                      ns: 'common',
                      studentId: user.studentNumber,
                      room: user.roomNumber,
                    })
                  : t('header.subtitle.noRoom', { ns: 'common', studentId: user.studentNumber })}
              </h2>
            </div>
            <img src="/house-logo.png" alt="house-logo" className="h-15" />
          </div>

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
                onClick={() => setNoticeDialogOpen(true)}
              >
                {t('application.button.next')}
              </Button>
            </LayoutCard.Footer>
          </LayoutCard.Root>
        </div>
      </div>
      <Dialog.Root isOpen={noticeDialogOpen} onOpenChange={setNoticeDialogOpen}>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>{t('application.dialog.notice.title')}</Dialog.Title>
            <Dialog.Description>{t('application.dialog.notice.description')}</Dialog.Description>
          </Dialog.Header>
          <Dialog.Body>
            <ol className="list-decimal space-y-2 pl-5">
              {Object.values(t('application.dialog.notice.items', { returnObjects: true })).map(
                (item: string, index: number) => (
                  <li key={index}>{item}</li>
                ),
              )}
            </ol>
          </Dialog.Body>
          <Dialog.Footer>
            <Button
              variant="default"
              onClick={() => onSubmit().then(() => setNoticeDialogOpen(false))}
              disabled={formState.isSubmitting}
            >
              {t('application.dialog.notice.button')}
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
      <Dialog.Root isOpen={successDialogOpen} onOpenChange={setSuccessDialogOpen}>
        <Dialog.Content>
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
        </Dialog.Content>
      </Dialog.Root>
      <Dialog.Root isOpen={fullDialogOpen} onOpenChange={setFullDialogOpen}>
        <Dialog.Content>
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
        </Dialog.Content>
      </Dialog.Root>
      <Dialog.Root isOpen={updateDialogOpen} onOpenChange={setUpdateDialogOpen}>
        <Dialog.Content>
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
        </Dialog.Content>
      </Dialog.Root>
      <Dialog.Root
        isOpen={modifyTimeRestrictedDialogOpen}
        onOpenChange={setModifyTimeRestrictedDialogOpen}
      >
        <Dialog.Content>
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
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
}
