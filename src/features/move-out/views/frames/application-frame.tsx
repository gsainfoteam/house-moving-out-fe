import { useState } from 'react';

import { useFindActiveMoveOutScheduleWithSlots } from '../../viewmodels';
import { DateSelect } from '../components';

import type { Dayjs } from 'dayjs';

// TODO: 컴포넌트와 검사 시각 선택, 주의 사항 확인 다이얼로그, 신청마감/성공 다이얼로그, 메인 프레임과 연결, 404 시 신청 대상 아닙니다로 연결(step 목업 제거)

export function ApplicationFrame() {
  const { inspectionDays, inspectionSlotsByDay } = useFindActiveMoveOutScheduleWithSlots();
  const [selectedDay, setSelectedDay] = useState<Dayjs | null>(null);

  const selectedDaySlots = selectedDay ? inspectionSlotsByDay[selectedDay.valueOf()] : [];

  return (
    <div className="p-4">
      <DateSelect
        days={inspectionDays}
        value={selectedDay}
        onChange={setSelectedDay}
      />
      {selectedDay && (
        <div className="mt-6 flex flex-col gap-2">
          {selectedDaySlots?.map((slot) => (
            <div key={slot.uuid} className="rounded border border-gray-200 bg-gray-50 px-3 py-2">
              {slot.startTime.format('HH:mm')} ~ {slot.endTime.format('HH:mm')}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
