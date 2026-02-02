import dayjs from 'dayjs';
import { groupBy } from 'es-toolkit/array';

import { cn } from '@/common/utils';

import type { InspectionSlot } from '../../models';

const START_HOUR = 10;
const END_HOUR = 18;

export function SlotSummary({ slots, type }: { slots: InspectionSlot[]; type: 'male' | 'female' }) {
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
          <td>{type}</td>
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
                if (!item) return <td key={d} />;
                const reservedCount =
                  type === 'male' ? item.maleReservedCount : item.femaleReservedCount;
                const capacity = type === 'male' ? item.maleCapacity : item.femaleCapacity;
                return (
                  <td
                    key={d}
                    className={cn('bg-green-200', reservedCount === capacity && 'bg-red-200')}
                  >
                    {reservedCount}/{capacity}
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
