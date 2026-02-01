import { useState } from 'react';

import { useFindActiveMoveOutScheduleWithSlots } from '../../viewmodels';
import { DateSelect, TimeSelect } from '../components';

import type { Dayjs } from 'dayjs';

// TODO: 컴포넌트와 검사 시각 선택, 주의 사항 확인 다이얼로그, 신청마감/성공 다이얼로그, 메인 프레임과 연결, 404 시 신청 대상 아닙니다로 연결(step 목업 제거)

export function ApplicationFrame() {
  const { inspectionDays, inspectionSlotsByDay } = useFindActiveMoveOutScheduleWithSlots();
  const [selectedDay, setSelectedDay] = useState<Dayjs | null>(null);
  const [selectedSlotUuid, setSelectedSlotUuid] = useState<string | null>(null);

  const selectedDaySlots = selectedDay ? inspectionSlotsByDay[selectedDay.valueOf()] : [];

  const handleDayChange = (day: Dayjs) => {
    if (selectedDay?.valueOf() === day.valueOf()) {
      setSelectedDay(null);
      setSelectedSlotUuid(null);
    } else {
      setSelectedDay(day);
      setSelectedSlotUuid(null);
    }
  };

  return (
    <div className="p-4">
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
  );
}
