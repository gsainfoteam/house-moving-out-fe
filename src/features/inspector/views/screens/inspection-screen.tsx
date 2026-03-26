import { Link } from '@tanstack/react-router';

import { PhoneCall } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { Accordion, Button, Checkbox, Dialog, LayoutCard, Loading } from '@/common/components';
import { checklist, overlay } from '@/common/lib';
import { cn } from '@/common/utils';

import { SampleImageButton } from '../components';

import type { UseFormRegister } from 'react-hook-form';

function NoShowFinalDialog({ onConfirm }: { onConfirm: () => void }) {
  const { t } = useTranslation('inspector');
  return (
    <Dialog.Root closeOnBackdrop={false} closeOnEscape={false}>
      <Dialog.Header>
        <Dialog.Title>{t('checklist.noShow.final.title')}</Dialog.Title>
        <Dialog.Description>{t('checklist.noShow.final.description')}</Dialog.Description>
      </Dialog.Header>
      <Dialog.Footer>
        <Dialog.Close asChild>
          <Button variant="outline">{t('checklist.noShow.final.cancel')}</Button>
        </Dialog.Close>
        <Button variant="failed" onClick={onConfirm} className="w-full">
          {t('checklist.noShow.final.confirm')}
        </Button>
      </Dialog.Footer>
    </Dialog.Root>
  );
}

function NoShowPhoneDialog({ phone, onNoAnswer }: { phone: string; onNoAnswer: () => void }) {
  const { t } = useTranslation('inspector');
  return (
    <Dialog.Root closeOnBackdrop={false} closeOnEscape={false}>
      <Dialog.Header>
        <Dialog.Title>{t('checklist.noShow.phone.title')}</Dialog.Title>
        <Dialog.Description>{t('checklist.noShow.phone.description')}</Dialog.Description>
      </Dialog.Header>
      <Dialog.Body className="flex justify-center">
        <a
          href={`tel:${phone.replace(/[^\d+]/g, '')}`}
          className="flex items-center gap-1 underline"
        >
          <PhoneCall size={14} />
          {phone}
        </a>
      </Dialog.Body>
      <Dialog.Footer>
        <Dialog.Close asChild>
          <Button variant="outline">{t('checklist.noShow.phone.answered')}</Button>
        </Dialog.Close>
        <Dialog.Close asChild>
          <Button variant="failed" onClick={onNoAnswer}>
            {t('checklist.noShow.phone.noAnswer')}
          </Button>
        </Dialog.Close>
      </Dialog.Footer>
    </Dialog.Root>
  );
}

function NoShowDialog({ onConfirm }: { onConfirm: () => Promise<void> }) {
  const { t } = useTranslation('inspector');
  return (
    <Dialog.Root>
      <Dialog.Header>
        <Dialog.Title>{t('checklist.noShow.title')}</Dialog.Title>
        <Dialog.Description>{t('checklist.noShow.description')}</Dialog.Description>
      </Dialog.Header>
      <Dialog.Footer>
        <Dialog.Close asChild>
          <Button variant="outline">{t('checklist.noShow.cancel')}</Button>
        </Dialog.Close>
        <Button variant="default" onClick={onConfirm} className="w-full">
          {t('checklist.noShow.confirm')}
        </Button>
      </Dialog.Footer>
    </Dialog.Root>
  );
}

export function InspectionScreen({
  isLoading,
  target,
  roomType,
  register,
  getSectionProgress,
  checkSection,
  isAllChecked,
  isNoneChecked,
  onNoShowRequest,
  onNoShowConfirm,
  uuid,
}: InspectionScreen.Props) {
  const { t } = useTranslation('inspector');

  const handleNoShowClick = () => {
    overlay.open(({ close: closeDialog1 }) => (
      <NoShowDialog
        onConfirm={async () => {
          const phone = await onNoShowRequest();
          if (!phone) {
            toast.error(t('checklist.noShow.requestFailed'));
            return;
          }
          closeDialog1();

          overlay.open(({ close: closeDialog2 }) => (
            <NoShowPhoneDialog
              phone={phone}
              onNoAnswer={() => {
                closeDialog2();

                overlay.open(({ close: closeDialog3 }) => (
                  <NoShowFinalDialog
                    onConfirm={async () => {
                      await onNoShowConfirm();
                      closeDialog3();
                    }}
                  />
                ));
              }}
            />
          ));
        }}
      />
    ));
  };

  if (isLoading) return <Loading />;
  if (!target) return <div>{t('error.notFound')}</div>;

  return (
    <LayoutCard.Root isLoading={isLoading}>
      <LayoutCard.Header>
        <LayoutCard.Text>
          <LayoutCard.Title>
            {`${target.roomNumber} - ${target.residents.map((r) => r.name).join(', ')}`}
          </LayoutCard.Title>
        </LayoutCard.Text>
      </LayoutCard.Header>
      <LayoutCard.Body className="gap-3">
        {[...checklist.sections, 'issues' as const].map((sectionKey) => {
          if (!roomType) return null;
          const itemEntries = checklist[roomType][sectionKey];
          if (itemEntries.length === 0) return null;
          const { totalCount, completedCount, isCompleted } = getSectionProgress(sectionKey);

          return (
            <Accordion.Root key={sectionKey}>
              <Accordion.Header>
                <Accordion.Title>{t(`checklist.sections.${sectionKey}`)}</Accordion.Title>
                <span
                  className={cn(
                    'text-label ml-auto font-medium',
                    isCompleted ? 'text-primary' : 'text-status-fail',
                  )}
                >
                  ({completedCount}/{totalCount})
                </span>
                <span role="presentation" onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={isCompleted}
                    onChange={(e) => checkSection(sectionKey, e.target.checked)}
                  />
                </span>
              </Accordion.Header>
              <Accordion.Content className="p-2 py-1.5">
                <ul className="text-body text-text-primary flex flex-col">
                  {itemEntries.map((item) => {
                    if (item === null) return null;
                    const [itemKey, ...images] = item;
                    const checkboxId = `inspection-check-${itemKey}`;
                    return (
                      <li key={itemKey}>
                        <label
                          htmlFor={checkboxId}
                          className="flex w-full cursor-pointer items-center gap-2 py-1.5 pr-2 pl-2"
                        >
                          <span className="flex items-center gap-2">
                            <span>{t(itemKey, { ns: 'checklist' })}</span>
                            {images.map((image, index) => (
                              <SampleImageButton key={index} image={image} />
                            ))}
                          </span>
                          <span className="ml-auto flex items-center px-2">
                            <Checkbox id={checkboxId} {...register(`items.${itemKey}`)} />
                          </span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </Accordion.Content>
            </Accordion.Root>
          );
        })}
      </LayoutCard.Body>
      <LayoutCard.Footer className="flex-col">
        {isNoneChecked && (
          <Button variant="subtle" onClick={handleNoShowClick}>
            {t('checklist.cta.noShow')}
          </Button>
        )}
        <Button variant={isAllChecked ? 'default' : 'failed'} className="w-full" asChild>
          <Link to="/inspector/$uuid/note" params={{ uuid }}>
            {isAllChecked ? t('checklist.cta.allClear') : t('checklist.cta.hasIssues')}
          </Link>
        </Button>
      </LayoutCard.Footer>
    </LayoutCard.Root>
  );
}

export namespace InspectionScreen {
  export type Target = {
    roomNumber: string;
    residents: { name: string }[];
  };

  export type Props = {
    isLoading: boolean;
    target: Target | undefined;
    roomType: 'solo' | 'b' | 'a2' | 'a3' | undefined;
    register: UseFormRegister<{
      items: Record<checklist.Item, boolean>;
      note: string;
      inspectorSignature: string;
      targetSignature: string;
    }>;
    getSectionProgress: (section: checklist.Section) => {
      totalCount: number;
      completedCount: number;
      isCompleted: boolean;
    };
    checkSection: (section: checklist.Section, checked: boolean) => void;
    isAllChecked: boolean;
    isNoneChecked: boolean;
    onNoShowRequest: () => Promise<string | undefined>;
    onNoShowConfirm: () => Promise<void>;
    uuid: string;
  };
}
