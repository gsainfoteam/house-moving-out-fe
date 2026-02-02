import { cn } from '@/common/utils';

import type { Dayjs } from 'dayjs';

export function DateSelect({ days, value, onChange, className }: DateSelect.Props) {
  return (
    <div
      className={cn(
        'border-icon-gray flex w-full gap-0 overflow-hidden rounded-lg border',
        className,
      )}
    >
      {days.map((day, index) => {
        const isSelected = value !== null && day.valueOf() === value.valueOf();
        const isFirst = index === 0;

        return (
          <button
            type="button"
            key={day.toISOString()}
            aria-pressed={isSelected}
            data-selected={isSelected}
            className={cn(
              'flex flex-1 flex-col gap-1 px-5 py-2.5 text-center transition-all',
              !isFirst && 'border-icon-gray border-l',
              isSelected ? 'bg-primary-main text-text-white' : 'bg-icon-light-gray',
            )}
            onClick={() => onChange(day)}
          >
            <span className={cn('text-sub2', isSelected && 'font-bold')}>
              {day.format('MM/DD')}
            </span>
            <span
              className={cn(
                'text-sub',
                isSelected ? 'text-text-white font-bold' : 'text-text-black',
              )}
            >
              ({day.format('ddd')})
            </span>
          </button>
        );
      })}
    </div>
  );
}

export namespace DateSelect {
  export type Props = {
    days: Dayjs[];
    value: Dayjs | null;
    onChange: (day: Dayjs) => void;
    className?: string;
  };
}
