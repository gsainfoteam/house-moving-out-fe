import { useState } from 'react';

import { Link } from '@tanstack/react-router';

import dayjs from 'dayjs';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import ModalCheck from '@/assets/modal-check.svg?react';
import ModalX from '@/assets/modal-x.svg?react';
import { Button, Dialog, LayoutCard, Loading } from '@/common/components';
import { useAuth } from '@/features/auth';

import { useApplicationForm } from '../../viewmodels';
import { DateSelect, TimeSelect } from '../components';

// TODO: 신청 성공/마감 다이얼로그
// TODO: LayoutCard 컴포넌트 sub 컴포넌트 구조 리팩토링 및 왼쪽 정렬?
// TODO: Layout 컴포넌트 만들어서 전체 리팩토링

export function ApplicationFrame() {
  const { t } = useTranslation('move-out');
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [fullDialogOpen, setFullDialogOpen] = useState(false);

  const {
    form: { control, formState, setValue },
    applicationStartTime,
    inspectionDays,
    isApplicationPeriod,
    isLoading,
    isNotFound,
    inspectionDayTimestamp,
    selectedDaySlots,
    onSubmit,
  } = useApplicationForm({
    onSuccess: () => {
      setSuccessDialogOpen(true);
    },
    onFull: () => {
      setFullDialogOpen(true);
    },
  });
  const { user } = useAuth();

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
                {t('header.subtitle', {
                  ns: 'common',
                  studentId: user.studentNumber,
                  room: 'T207', // TODO: mock user room
                })}
              </h2>
            </div>
            <img src="/house-logo.png" alt="house-logo" className="h-15" />
          </div>

          <LayoutCard.Root>
            {isLoading ? (
              <Loading className="h-full" />
            ) : isNotFound || !isApplicationPeriod ? (
              <>
                <LayoutCard.Content>
                  <LayoutCard.Header>
                    <LayoutCard.Media>
                      <img src="./3d/not-period.png" alt="not-period" className="h-60" />
                    </LayoutCard.Media>
                    <LayoutCard.Text>
                      <LayoutCard.Title className="text-text-black">
                        {t('notPeriod.title')}
                      </LayoutCard.Title>
                      {applicationStartTime && (
                        <LayoutCard.Description>
                          {t('notPeriod.description', {
                            startTime: applicationStartTime.format('MM/DD'),
                          })}
                        </LayoutCard.Description>
                      )}
                    </LayoutCard.Text>
                  </LayoutCard.Header>
                </LayoutCard.Content>
                <LayoutCard.Footer>
                  <LayoutCard.Button variant="outline" className="w-full">
                    {t('notPeriod.button')}
                  </LayoutCard.Button>
                </LayoutCard.Footer>
              </>
            ) : (
              <>
                <LayoutCard.Content>
                  <LayoutCard.Header>
                    <LayoutCard.Text>
                      <LayoutCard.Title className="text-primary-main">
                        {t('application.title')}
                      </LayoutCard.Title>
                      <LayoutCard.Description>
                        {t('application.description')}
                      </LayoutCard.Description>
                    </LayoutCard.Text>
                  </LayoutCard.Header>
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
                </LayoutCard.Content>
                <LayoutCard.Footer className="mt-auto">
                  <LayoutCard.Button variant="outline" asChild>
                    <Link to="/">{t('application.button.cancel')}</Link>
                  </LayoutCard.Button>
                  <Dialog.Root>
                    <Dialog.Trigger asChild>
                      <LayoutCard.Button
                        variant="default"
                        className="w-full"
                        disabled={!formState.isValid}
                      >
                        {t('application.button.next')}
                      </LayoutCard.Button>
                    </Dialog.Trigger>
                    <Dialog.Content>
                      <Dialog.Header>
                        <Dialog.Title>{t('application.dialog.notice.title')}</Dialog.Title>
                        <Dialog.Description>
                          {t('application.dialog.notice.description')}
                        </Dialog.Description>
                      </Dialog.Header>
                      <Dialog.Body>
                        {/* TODO: mock */}
                        {Array.from({ length: 10 }).map((_, index) => (
                          <p key={index} className="mb-4 leading-normal">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                            velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                            occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                            mollit anim id est laborum.
                          </p>
                        ))}
                      </Dialog.Body>
                      <Dialog.Footer>
                        <Dialog.Close asChild>
                          <Button
                            variant="default"
                            onClick={onSubmit}
                            disabled={formState.isSubmitting}
                          >
                            {t('application.dialog.notice.button')}
                          </Button>
                        </Dialog.Close>
                      </Dialog.Footer>
                    </Dialog.Content>
                  </Dialog.Root>
                </LayoutCard.Footer>
              </>
            )}
          </LayoutCard.Root>
        </div>
      </div>
      <Dialog.Root isOpen={successDialogOpen} onOpenChange={setSuccessDialogOpen}>
        <Dialog.Content>
          <Dialog.Header>
            <ModalCheck className="mb-3" />
            <Dialog.Title>{t('application.dialog.check.title')}</Dialog.Title>
          </Dialog.Header>
          <Dialog.Footer>
            <Dialog.Close asChild>
              <Button variant="failed" className="w-full">
                {t('application.dialog.check.button')}
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
              <Button variant="default" className="w-full">
                {t('application.dialog.full.button')}
              </Button>
            </Dialog.Close>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
}
