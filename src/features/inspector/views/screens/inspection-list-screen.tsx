import { Link } from '@tanstack/react-router';

import dayjs from 'dayjs';
import { Calendar, ListFilterIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button, Drawer, LayoutCard, useList } from '@/common/components';
import { overlay } from '@/common/lib';
import { cn } from '@/common/utils';

import { ApplicationStatus } from '../../viewmodels';
import { InspectionScheduleCard } from '../components';

// t('filter.items.all')
// t('filter.items.today')
// t('filter.items.not_completed')
const filters = ['all', 'today', 'not_completed'] as const;
type Filter = (typeof filters)[number];

const FilterDrawer = ({
  currentFilter,
  onFilterChange,
}: {
  currentFilter: Filter;
  onFilterChange: (filter: Filter) => void;
}) => {
  const { t } = useTranslation('inspector');
  return (
    <>
      <Drawer.Header>
        <Drawer.Title>{t('filter.title')}</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        {filters.map((filter) => (
          <Drawer.Close asChild key={filter}>
            <button
              className={cn(
                'text-body-lg text-text-primary flex w-full items-center gap-3 rounded-xl px-4 py-3',
                filter === currentFilter && 'bg-primary text-text-white',
              )}
              onClick={() => onFilterChange(filter)}
            >
              {t(`filter.items.${filter}`)}
            </button>
          </Drawer.Close>
        ))}
      </Drawer.Body>
    </>
  );
};

function FilterButton({
  filter,
  onFilterChange,
}: {
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
}) {
  const { t } = useTranslation('inspector');
  return (
    <Button
      aria-label={t('filter.title')}
      className={cn('self-start', filter !== 'all' && 'bg-primary')}
      variant="subtle"
      size="icon"
      onClick={() =>
        overlay.open(() => (
          <Drawer.Root>
            <FilterDrawer currentFilter={filter} onFilterChange={onFilterChange} />
          </Drawer.Root>
        ))
      }
    >
      <ListFilterIcon className={cn('size-4', filter !== 'all' && 'text-text-white')} />
    </Button>
  );
}

export function InspectionListScreen({
  targets,
  isLoading,
  filter,
  onFilterChange,
}: InspectionListScreen.Props) {
  const { t } = useTranslation('inspector');
  const list = useList(targets);

  return (
    <LayoutCard.Root isLoading={isLoading}>
      <LayoutCard.Header className="flex-row items-start justify-start">
        <LayoutCard.Text className="flex-1">
          <LayoutCard.Title>{t('list.title')}</LayoutCard.Title>
          <LayoutCard.Description>{t('list.description')}</LayoutCard.Description>
        </LayoutCard.Text>
        <FilterButton filter={filter} onFilterChange={onFilterChange} />
      </LayoutCard.Header>
      <LayoutCard.Body>
        <list.Root className="gap-3">
          <list.Empty
            icon={<Calendar />}
            title={t('inspector.emptySchedule')}
            description={t('inspector.emptyScheduleDescription')}
          />
          <list.Builder className="flex w-full flex-col gap-2">
            {(target) => (
              <Link
                to="/inspector/$uuid"
                params={{ uuid: target.uuid }}
                className="w-full"
                disabled={!!target.status && target.status !== ApplicationStatus.PENDING_NO_SHOW}
              >
                <InspectionScheduleCard
                  time={dayjs(target.inspectionTime)}
                  roomLabel={target.roomNumber}
                  residentName={target.residents.map((r) => r.name).join(', ')}
                  status={target.status}
                />
              </Link>
            )}
          </list.Builder>
        </list.Root>
      </LayoutCard.Body>
    </LayoutCard.Root>
  );
}

export namespace InspectionListScreen {
  export type Target = {
    uuid: string;
    inspectionTime: string;
    roomNumber: string;
    residents: { name: string }[];
    status?: ApplicationStatus | null;
  };

  export type Props = {
    targets: Target[];
    isLoading: boolean;
    filter: Filter;
    onFilterChange: (filter: Filter) => void;
  };
}
