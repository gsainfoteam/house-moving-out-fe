import { useNavigate, useParams } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import { Accordion, Button, Checkbox, LayoutCard } from '@/common/components';
import { cn } from '@/common/utils';

import { useInspectionChecklistContext, useGetInspectionTargets } from '../../viewmodels';

export function InspectionFrame() {
  const { t } = useTranslation('inspector');
  const { uuid } = useParams({ from: '/_auth-required/_user/inspector/$uuid/' });
  const {
    form: { register },
    sections,
    getSectionProgress,
    isAllChecked,
  } = useInspectionChecklistContext();
  const navigate = useNavigate();
  const { targets, isLoading } = useGetInspectionTargets();

  const target = targets?.find((target) => target.uuid === uuid);

  return (
    <LayoutCard.Root isLoading={isLoading}>
      <LayoutCard.Header>
        <LayoutCard.Text>
          <LayoutCard.Title>
            {`${target?.roomNumber} - ${target?.residents.map((resident) => resident.name).join(', ')}`}
          </LayoutCard.Title>
        </LayoutCard.Text>
      </LayoutCard.Header>
      <LayoutCard.Body className="gap-3">
        {Object.entries(sections).map(([sectionKey, section]) => {
          const itemEntries = Object.entries(section.items ?? {});
          const { totalCount, completedCount, isCompleted } = getSectionProgress(sectionKey);

          return (
            <Accordion.Root key={sectionKey}>
              <Accordion.Header>
                <Accordion.Title>{section.title}</Accordion.Title>
                <span
                  className={cn(
                    'text-sub ml-auto font-medium',
                    isCompleted ? 'text-primary-main' : 'text-status-fail',
                  )}
                >
                  ({completedCount}/{totalCount})
                </span>
              </Accordion.Header>
              <Accordion.Content>
                <ul className="text-box2 text-text-black flex flex-col gap-3">
                  {itemEntries.map(([itemKey, label]) => (
                    <li key={itemKey} className="flex items-center gap-2">
                      <label className="flex w-full cursor-pointer items-center justify-between gap-2">
                        <span>{label}</span>
                        <Checkbox {...register(`${sectionKey}.${itemKey}`)} />
                      </label>
                    </li>
                  ))}
                </ul>
              </Accordion.Content>
            </Accordion.Root>
          );
        })}
      </LayoutCard.Body>
      <LayoutCard.Footer>
        <Button
          variant={isAllChecked ? 'default' : 'failed'}
          className="w-full"
          onClick={() => {
            navigate({ to: '/inspector/$uuid/note', params: { uuid } });
          }}
        >
          {isAllChecked ? t('checklist.cta.allClear') : t('checklist.cta.hasIssues')}
        </Button>
      </LayoutCard.Footer>
    </LayoutCard.Root>
  );
}
