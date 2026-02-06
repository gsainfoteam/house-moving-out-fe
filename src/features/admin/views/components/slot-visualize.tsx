import dayjs from 'dayjs';
import { groupBy } from 'es-toolkit/array';

import { cn } from '@/common/utils';

const START_HOUR = 10;
const END_HOUR = 18;

export function SlotVisualize({
  slots,
  title,
  capacity,
  onClick,
  selectedSlots = [],
}: {
  slots: { uuid: string; startTime: string; reservedCount: number }[];
  title: string;
  /** null to visualize for inspectors */
  capacity: number | null;
  onClick?: (slotUuid: string) => void;
  selectedSlots?: string[];
}) {
  if (slots.length === 0) return null;

  const groupedSlot = groupBy(slots, (s) => ((dayjs(s.startTime).day() + 6) % 7) + 1);
  const sunday = dayjs(slots[0].startTime).day(0).startOf('d');

  return (
    <table
      className={cn(
        '[&_td]:border [&_td]:px-2 [&_td]:text-center',
        '[&_th]:border [&_th]:px-2 [&_th]:text-center',
      )}
    >
      <thead>
        <tr>
          <td>{title}</td>
          <th>{sunday.day(4).format('D dd')}</th>
          <th>{sunday.day(5).format('D dd')}</th>
          <th>{sunday.day(6).format('D dd')}</th>
          <th>{sunday.day(7).format('D dd')}</th>
        </tr>
      </thead>
      <tbody>
        {[...Array((END_HOUR - START_HOUR) * 2)].map((_, i) => {
          const startHour = sunday.add(START_HOUR + i / 2, 'hour');
          const endHour = startHour.add(30, 'm');
          return (
            <tr key={i}>
              <th>
                {startHour.format('HH:mm')} ~ {endHour.format('HH:mm')}
              </th>
              {[4, 5, 6, 7].map((d) => {
                const startOfDay = sunday.day(d);
                const item = groupedSlot[d]?.find(
                  (s) => dayjs(s.startTime).diff(startOfDay, 'h', true) === START_HOUR + i / 2,
                );
                if (!item) return <td key={d} className={cn(onClick && 'cursor-not-allowed')} />;
                return (
                  <td
                    onClick={() => onClick?.(item.uuid)}
                    key={d}
                    className={cn(
                      'bg-green-200',
                      (capacity === null
                        ? item.reservedCount > 0
                        : item.reservedCount >= capacity) && 'bg-red-200',
                      selectedSlots.includes(item.uuid) && 'bg-yellow-300',
                      onClick && 'cursor-pointer',
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
