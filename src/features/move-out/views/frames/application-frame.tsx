import { useState } from 'react';

import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import { LayoutCard, Loading } from '@/common/components';
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
  if (isLoading) return <Loading />;

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

        {isNotFound || !isApplicationPeriod ? (
          <LayoutCard.Root>
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
          </LayoutCard.Root>
        ) : (
          <LayoutCard.Root>
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
                <DateSelect days={inspectionDays} value={selectedDay} onChange={handleDayChange} />
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
              <LayoutCard.Button variant="default" className="w-full">
                {t('application.button.next')}
              </LayoutCard.Button>
            </LayoutCard.Footer>
          </LayoutCard.Root>
        )}
      </div>
    </div>
  );
}
