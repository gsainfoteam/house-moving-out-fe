import { Link, useParams } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import { Accordion, Button, Checkbox, LayoutCard, Loading } from '@/common/components';
import { cn } from '@/common/utils';

import { checklist } from '../../models';
import { useInspectionChecklistContext } from '../../viewmodels';
import { SampleImageButton } from '../components';

export function InspectionFrame() {
  const { t } = useTranslation('inspector');
  const { uuid } = useParams({ from: '/_auth-required/_user/inspector/$uuid/' });
  const {
    form: { register },
    getSectionProgress,
    isAllChecked,
    target,
    isLoading,
    roomType,
  } = useInspectionChecklistContext();

  if (isLoading) return <Loading />;
  if (!target) return <div>{t('error.notFound')}</div>;

  return (
    <LayoutCard.Root isLoading={isLoading}>
      <LayoutCard.Header>
        <LayoutCard.Text>
          <LayoutCard.Title>
            {`${target.roomNumber} - ${target.residents.map((resident) => resident.name).join(', ')}`}
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
                    'text-sub ml-auto font-medium',
                    isCompleted ? 'text-primary-main' : 'text-status-fail',
                  )}
                >
                  ({completedCount}/{totalCount})
                </span>
              </Accordion.Header>
              <Accordion.Content className="p-2 py-1.5">
                <ul className="text-box2 text-text-black flex flex-col">
                  {itemEntries.map((item) => {
                    if (item === null) return null;
                    const [itemKey, ...images] = item;
                    return (
                      <li key={itemKey} className="flex items-center justify-between gap-2 pl-2">
                        <span className="flex items-center gap-2">
                          <span id={`checklist-item-label-${itemKey}`}>
                            {t(`checklist.items.${itemKey}`)}
                          </span>
                          {images.map((image, index) => (
                            <SampleImageButton key={index} image={image} />
                          ))}
                        </span>
                        <label
                          className="cursor-pointer px-2 py-1.5"
                          aria-labelledby={`checklist-item-label-${itemKey}`}
                        >
                          <Checkbox {...register(`items.${itemKey}`)} />
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
