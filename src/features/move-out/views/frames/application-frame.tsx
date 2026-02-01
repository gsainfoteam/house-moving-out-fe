import { useState } from 'react';

import { useFindActiveMoveOutScheduleWithSlots } from '../../viewmodels';

import type { Dayjs } from 'dayjs';

export function ApplicationFrame() {
  const { inspectionDays, inspectionSlotsByDay } = useFindActiveMoveOutScheduleWithSlots();
  const [selectedDay, setSelectedDay] = useState<Dayjs | null>(null);

  const selectedDaySlots = selectedDay ? inspectionSlotsByDay[selectedDay.valueOf()] : [];

  return (
    <div className="p-4">
      <div className="flex gap-4">
        {inspectionDays.map((day) => (
          <button
            type="button"
            key={day.toISOString()}
            className="flex flex-col gap-1 rounded border p-3 text-center transition-colors hover:bg-gray-100 data-[selected=true]:border-gray-400 data-[selected=true]:bg-gray-100"
            onClick={() => setSelectedDay(day)}
          >
            <h2>{day.format('MM/DD')}</h2>
            <p>{day.format('dddd')}</p>
          </button>
        ))}
      </div>
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
