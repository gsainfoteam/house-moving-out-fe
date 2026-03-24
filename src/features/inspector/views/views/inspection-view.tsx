import { Link } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import { Accordion, Button, Checkbox, LayoutCard, Loading } from '@/common/components';
import { checklist } from '@/common/lib';
import { cn } from '@/common/utils';

import { SampleImageButton } from '../components';

import type { UseFormRegister } from 'react-hook-form';

export function InspectionView({
  isLoading,
  target,
  roomType,
  register,
  getSectionProgress,
  isAllChecked,
  uuid,
}: InspectionView.Props) {
  const { t } = useTranslation('inspector');

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
                          className="flex w-full cursor-pointer items-center gap-2 pl-2 py-1.5 pr-2"
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
      <LayoutCard.Footer>
        <Button variant={isAllChecked ? 'default' : 'failed'} className="w-full" asChild>
          <Link to="/inspector/$uuid/note" params={{ uuid }}>
            {isAllChecked ? t('checklist.cta.allClear') : t('checklist.cta.hasIssues')}
          </Link>
        </Button>
      </LayoutCard.Footer>
    </LayoutCard.Root>
  );
}

export namespace InspectionView {
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
    isAllChecked: boolean;
    uuid: string;
  };
}
