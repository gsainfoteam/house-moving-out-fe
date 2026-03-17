import { useEffect, useRef } from 'react';

import dayjs from 'dayjs';
import { range } from 'es-toolkit';
import { groupBy } from 'es-toolkit/array';

import { cn } from '@/common/utils';

const START_HOUR = 10;
const END_HOUR = 18;

const cellBase = cn('border border-gray-200 transition-colors duration-150 min-w-10');
const headerCell = cn('bg-bg-surface/80 font-medium text-text-black px-3 py-2 text-center');
const timeCell = cn(
  'bg-bg-surface/60 text-text-gray px-2 py-1.5 text-sub font-medium w-28 whitespace-nowrap',
);

export function SlotVisualize({
  slots,
  title,
  capacity,
  onClick,
  selectedSlots = [],
}: {
  slots: { uuid: string; startTime: string | dayjs.Dayjs; reservedCount: number }[];
  title: string;
  /** null to visualize for inspectors */
  capacity: number | null;
  onClick?: (slotUuid: string, enable: boolean) => void;
  selectedSlots?: string[];
}) {
  const pressing = useRef<boolean | null>(null);

  useEffect(() => {
    const up = () => (pressing.current = null);
    document.addEventListener('mouseup', up);
    return () => document.removeEventListener('mouseup', up);
  }, []);

  if (slots.length === 0) return null;

  const minDay = Math.min(...slots.map((s) => ((dayjs(s.startTime).day() + 6) % 7) + 1));
  const maxDay = Math.max(...slots.map((s) => ((dayjs(s.startTime).day() + 6) % 7) + 1));
  const groupedSlot = groupBy(slots, (s) => ((dayjs(s.startTime).day() + 6) % 7) + 1);
  const sunday = dayjs(slots[0].startTime).day(0).startOf('d');
  const days = range(minDay, maxDay + 1);

  return (
    <table className="text-box2 bg-bg-white w-full min-w-[200px] border-collapse overflow-hidden rounded-xl border border-gray-200 shadow-sm select-none">
      <thead>
        <tr>
          <th className={cn(cellBase, headerCell, 'text-text-black font-semibold')} scope="col">
            {title}
          </th>
          {days.map((d) => (
            <th key={d} className={cn(cellBase, headerCell)} scope="col">
              {sunday.day(d).format('D ddd')}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {range(START_HOUR, END_HOUR)
          .map((h) => sunday.hour(h))
          .flatMap((i) => [i, i.add(15, 'm'), i.add(30, 'm'), i.add(45, 'm')])
          .map((startHour) => {
            const endHour = startHour.add(15, 'm');
            return (
              <tr key={startHour.toISOString()}>
                <th
                  className={cn(cellBase, timeCell)}
                  scope="row"
                  title={`${startHour.format('HH:mm')} ~ ${endHour.format('HH:mm')}`}
                >
                  {startHour.format('HH:mm')}-{endHour.format('HH:mm')}
                </th>
                {days.map((d) => {
                  const item = groupedSlot[d]?.find((s) =>
                    dayjs(s.startTime).isSame(startHour.day(d), 'minute'),
                  );
                  if (!item) {
                    console.log(startHour.day(d).toISOString());
                    return (
                      <td
                        key={d}
                        data-empty
                        className={cn(
                          cellBase,
                          'bg-icon-light-gray/60 text-text-gray',
                          onClick && 'cursor-not-allowed',
                        )}
                        aria-hidden
                      />
                    );
                  }
                  const isFull =
                    capacity === null ? item.reservedCount > 0 : item.reservedCount >= capacity;
                  const isSelected = selectedSlots.includes(item.uuid);
                  return (
                    <td
                      data-slot
                      onMouseDown={() => {
                        const mode = !isSelected;
                        pressing.current = mode;
                        return onClick?.(item.uuid, mode);
                      }}
                      onMouseMove={() => {
                        const mode = pressing.current;
                        if (mode === null) return;
                        return onClick?.(item.uuid, mode);
                      }}
                      key={d}
                      className={cn(
                        cellBase,
                        'text-text-black px-2 py-1.5 text-center font-medium tabular-nums',
                        isSelected &&
                          'ring-primary-main bg-primary-main text-text-white ring-2 ring-inset',
                        !isSelected && isFull && 'bg-icon-red text-text-black',
                        !isSelected && !isFull && 'bg-bg-green text-text-black',
                        onClick && 'cursor-pointer',
                        onClick && 'hover:opacity-60',
                      )}
                    >
                      {item.reservedCount}
                    </td>
                  );
                })}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}
