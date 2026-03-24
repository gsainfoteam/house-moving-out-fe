import { Link } from '@tanstack/react-router';

import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import { Button, Checkbox, Dialog, LayoutCard } from '@/common/components';
import { overlay } from '@/common/lib';
import { cn } from '@/common/utils';
import { useLoading } from '@/common/viewmodels';

import { useNoticeConsentForm } from '../../viewmodels';
import { DateSelect, TimeSelect } from '../components';

import type { Dayjs } from 'dayjs';

function NoticeConsentDialog({ onConfirm }: { onConfirm: () => Promise<void> }) {
  const { t } = useTranslation('user');
  const [isSubmitting, startLoading] = useLoading();

  const items = Object.values(
    t('application.dialog.notice.items', { returnObjects: true }) as Record<string, string>,
  );
  const { register, isValid, valuesByIndex } = useNoticeConsentForm(items);

  return (
    <Dialog.Root closeOnBackdrop>
      <Dialog.Header>
        <Dialog.Title>{t('application.dialog.notice.title')}</Dialog.Title>
        <Dialog.Description>{t('application.dialog.notice.description')}</Dialog.Description>
      </Dialog.Header>
      <Dialog.Body>
        <ul className="flex flex-col gap-2">
          {items.map((item, index) => (
            <li
              key={index}
              className={cn(
                'rounded-lg transition-colors',
                valuesByIndex[index] ? 'bg-primary/10' : 'bg-bg-surface/30',
              )}
            >
              <label className="text-body text-text-primary flex cursor-pointer items-start gap-2 px-3 py-2.5 leading-normal">
                <Checkbox {...register(String(index))} className="mt-0.5 shrink-0" />
                {item}
              </label>
            </li>
          ))}
        </ul>
      </Dialog.Body>
      <Dialog.Footer>
        <Button
          variant="default"
          className="w-full"
          disabled={!isValid || isSubmitting}
          onClick={() => startLoading(onConfirm)}
        >
          {t('application.dialog.notice.button')}
        </Button>
      </Dialog.Footer>
    </Dialog.Root>
  );
}

export function ApplicationScreen({
  isLoading,
  inspectionDays,
  inspectionDayTimestamp,
  selectedDaySlots,
  selectedSlotUuid,
  onDayChange,
  onSlotChange,
  isSubmitDisabled,
  onSubmit,
}: ApplicationScreen.Props) {
  const { t } = useTranslation('user');

  const handleSubmitClick = () => {
    overlay.open(({ close }) => (
      <NoticeConsentDialog onConfirm={() => onSubmit().then(() => close())} />
    ));
  };

  return (
    <LayoutCard.Root isLoading={isLoading}>
      <LayoutCard.Header>
        <LayoutCard.Text>
          <LayoutCard.Title className="text-primary">{t('application.title')}</LayoutCard.Title>
          <LayoutCard.Description>{t('application.description')}</LayoutCard.Description>
        </LayoutCard.Text>
      </LayoutCard.Header>
      <LayoutCard.Body>
        <div className="h-full w-full">
          <DateSelect
            days={inspectionDays}
            value={
              inspectionDayTimestamp != null ? dayjs(inspectionDayTimestamp).startOf('day') : null
            }
            onChange={(day) => onDayChange(day)}
          />
          {inspectionDayTimestamp != null && (
            <div className="mt-6 grid grid-cols-3 gap-2">
              {selectedDaySlots.map((slot) => (
                <TimeSelect
                  key={slot.uuid}
                  slot={slot}
                  value={selectedSlotUuid}
                  onChange={onSlotChange}
                />
              ))}
            </div>
          )}
        </div>
      </LayoutCard.Body>
      <LayoutCard.Footer className="mt-auto">
        <Button variant="outline" className="flex-1" asChild>
          <Link to="/">{t('application.button.cancel')}</Link>
        </Button>
        <Button
          variant="default"
          className="flex-1"
          disabled={isSubmitDisabled}
          onClick={handleSubmitClick}
        >
          {t('application.button.next')}
        </Button>
      </LayoutCard.Footer>
    </LayoutCard.Root>
  );
}

export namespace ApplicationScreen {
  export type Props = {
    isLoading: boolean;
    inspectionDays: Dayjs[];
    inspectionDayTimestamp: number | null;
    selectedDaySlots: TimeSelect.Slot[];
    selectedSlotUuid: string | null;
    onDayChange: (day: Dayjs) => void;
    onSlotChange: (slot: TimeSelect.Slot) => void;
    isSubmitDisabled: boolean;
    onSubmit: () => Promise<void>;
  };
}
