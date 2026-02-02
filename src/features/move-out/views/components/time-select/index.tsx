import { cn, cv } from '@/common/utils';

import type { Dayjs } from 'dayjs';
import type { VariantProps } from 'tailwind-variants';

export function TimeSelect({ slot, value, onChange }: TimeSelect.Props) {
  const isSelected = value === slot.uuid;
  const isClosed = slot.isClosed;
  const state: TimeSelect.SlotState = isClosed ? 'closed' : isSelected ? 'selected' : 'default';

  return (
    <button
      type="button"
      disabled={isClosed}
      aria-pressed={!isClosed && isSelected}
      aria-disabled={isClosed}
      className={cn(TimeSelect.slotStyles({ state }))}
      onClick={() => !isClosed && onChange(slot)}
    >
      {isClosed && (
        <span className="text-small bg-icon-gray text-text-black absolute top-1 right-1 rounded px-1 py-0.5">
          마감
        </span>
      )}
      {slot.startTime.format('HH:mm')}
    </button>
  );
}

export namespace TimeSelect {
  export type Slot = {
    uuid: string;
    startTime: Dayjs;
    endTime: Dayjs;
    isClosed: boolean;
  };

  export type Props = {
    slot: Slot;
    value: string | null;
    onChange: (slot: Slot) => void;
  };

  export const slotStyles = cv({
    base: ['text-box2 w-full relative rounded-lg px-7.5 py-3 text-center transition-all'],
    variants: {
      state: {
        closed: [
          'inset-ring-1 inset-ring-icon-gray bg-icon-light-gray text-text-gray cursor-not-allowed line-through',
        ],
        selected: ['font-bold inset-ring-2 inset-ring-primary-main bg-icon-green text-text-black'],
        default: ['bg-bg-white text-text-black inset-ring-1 inset-ring-icon-gray'],
      },
    },
  });

  export type SlotState = NonNullable<VariantProps<typeof slotStyles>['state']>;
}
