import { Link } from '@tanstack/react-router';

import dayjs from 'dayjs';
import { Calendar, ListFilterIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button, Drawer, LayoutCard, useList } from '@/common/components';
import { overlay } from '@/common/lib';
import { cn } from '@/common/utils';

import { type ApplicationStatus } from '../../viewmodels';
import { InspectionScheduleCard } from '../components';

type Filter = 'all' | 'today' | 'not_completed';

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
      <Drawer.Body></Drawer.Body>
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
  return (
    <Button
      className={cn('self-end', filter !== 'all' && 'bg-primary')}
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
      <LayoutCard.Header>
        <LayoutCard.Text>
          <LayoutCard.Title>{t('list.title')}</LayoutCard.Title>
          <LayoutCard.Description>{t('list.description')}</LayoutCard.Description>
        </LayoutCard.Text>
      </LayoutCard.Header>
      <LayoutCard.Body>
        <FilterButton filter={filter} onFilterChange={onFilterChange} />
        <list.Root className="gap-3">
          <list.Empty
            icon={<Calendar />}
            title={t('inspector.emptySchedule')}
            description={t('inspector.emptyScheduleDescription')}
          />
          <list.Builder className="flex w-full flex-col gap-3">
            {(target) => (
              <Link
                to="/inspector/$uuid"
                params={{ uuid: target.uuid }}
                className="w-full"
                disabled={!!target.status}
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
