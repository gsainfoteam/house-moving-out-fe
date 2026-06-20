import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import { cn, cv } from '@/common/utils';

import type { Dayjs } from 'dayjs';
import type { VariantProps } from 'tailwind-variants';

export function TimeSelect({ slot, value, onChange }: TimeSelect.Props) {
  const { t } = useTranslation('user');
  const isSelected = value === slot.uuid;
  const isPast = slot.startTime.isBefore(dayjs());
  const isClosed = slot.isClosed;
  const state: TimeSelect.SlotState = isPast
    ? 'past'
    : isClosed
      ? 'closed'
      : isSelected
        ? 'selected'
        : 'default';

  return (
    <button
      type="button"
      disabled={isClosed}
      aria-pressed={!isClosed && isSelected}
      aria-disabled={isClosed}
      className={cn(TimeSelect.slotStyles({ state }))}
      onClick={() => !isClosed && !isPast && onChange(slot)}
    >
      {isClosed && (
        <span className="text-caption bg-bg-surface text-text-secondary absolute top-1 right-1 rounded-md px-1 py-0.5">
          {t('timeSelect.closed')}
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
    base: ['text-body w-full relative rounded-xl px-6 py-2.5 text-center transition-all'],
    variants: {
      state: {
        closed: [
          'inset-ring-1 inset-ring-border bg-bg-surface text-text-secondary cursor-not-allowed line-through',
        ],
        selected: ['font-semibold inset-ring-2 inset-ring-primary bg-primary-light text-primary'],
        default: ['bg-bg text-text-primary inset-ring-1 inset-ring-border'],
        past: [
          'bg-bg-surface text-text-secondary cursor-not-allowed line-through inset-ring-1 inset-ring-border',
        ],
      },
    },
  });

  export type SlotState = NonNullable<VariantProps<typeof slotStyles>['state']>;
}
