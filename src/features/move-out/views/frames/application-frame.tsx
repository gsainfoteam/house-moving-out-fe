import { useState } from 'react';

import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import { Button, Dialog, LayoutCard, Loading } from '@/common/components';
import { useAuth } from '@/features/auth';

import { useFindActiveMoveOutScheduleWithSlots } from '../../viewmodels';
import { DateSelect, TimeSelect } from '../components';

import type { Dayjs } from 'dayjs';

// TODO: 컴포넌트와 검사 시각 선택, 주의 사항 확인 다이얼로그, 신청마감/성공 다이얼로그, 메인 프레임과 연결, 404 시 신청 대상 아닙니다로 연결(step 목업 제거)

export function ApplicationFrame() {
  const { t } = useTranslation('move-out');
  const {
    applicationStartTime,
    applicationEndTime,
    inspectionDays,
    inspectionSlotsByDay,
    isLoading,
    isNotFound,
  } = useFindActiveMoveOutScheduleWithSlots();
  const { user } = useAuth();

  const [selectedDay, setSelectedDay] = useState<Dayjs | null>(null);
  const [selectedSlotUuid, setSelectedSlotUuid] = useState<string | null>(null);

  const selectedDaySlots = selectedDay ? inspectionSlotsByDay[selectedDay.valueOf()] : [];
  const isApplicationPeriod =
    applicationStartTime &&
    applicationEndTime &&
    dayjs().isAfter(applicationStartTime) &&
    dayjs().isBefore(applicationEndTime);

  const handleDayChange = (day: Dayjs) => {
    if (selectedDay?.valueOf() === day.valueOf()) {
      setSelectedDay(null);
      setSelectedSlotUuid(null);
    } else {
      setSelectedDay(day);
      setSelectedSlotUuid(null);
    }
  };

  if (!user) return null;

  return (
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
                    <LayoutCard.Description>{t('application.description')}</LayoutCard.Description>
                  </LayoutCard.Text>
                </LayoutCard.Header>
                <div className="h-full w-full">
                  <DateSelect
                    days={inspectionDays}
                    value={selectedDay}
                    onChange={handleDayChange}
                  />
                  {selectedDay && (
                    <div className="mt-6 grid grid-cols-3 gap-2">
                      {selectedDaySlots.map((slot) => (
                        <TimeSelect
                          key={slot.uuid}
                          slot={slot}
                          value={selectedSlotUuid}
                          onChange={(slot) =>
                            setSelectedSlotUuid((prev) => (prev === slot.uuid ? null : slot.uuid))
                          }
                        />
                      ))}
                    </div>
                  )}
                </div>
              </LayoutCard.Content>
              <LayoutCard.Footer className="mt-auto">
                <LayoutCard.Button variant="outline">
                  {t('application.button.cancel')}
                </LayoutCard.Button>
                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <LayoutCard.Button
                      variant="default"
                      className="w-full"
                      disabled={!selectedDay || !selectedSlotUuid}
                    >
                      {t('application.button.next')}
                    </LayoutCard.Button>
                  </Dialog.Trigger>
                  <Dialog.Content>
                    <Dialog.Header>
                      <Dialog.Title>{t('application.dialog.title')}</Dialog.Title>
                      <Dialog.Description>{t('application.dialog.description')}</Dialog.Description>
                    </Dialog.Header>
                    <Dialog.Body>
                      {/* TODO: mock */}
                      {Array.from({ length: 10 }).map((_, index) => (
                        <p key={index} className="mb-4 leading-normal">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                          cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                          est laborum.
                        </p>
                      ))}
                    </Dialog.Body>
                    <Dialog.Footer>
                      <Dialog.Close asChild>
                        <Button>{t('application.dialog.button')}</Button>
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
  );
}
