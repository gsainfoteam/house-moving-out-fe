import { Link } from '@tanstack/react-router';

import dayjs from 'dayjs';
import { Calendar, ListFilterIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button, LayoutCard, useList } from '@/common/components';
import { cn } from '@/common/utils';

import { type ApplicationStatus } from '../../viewmodels';
import { InspectionScheduleCard } from '../components';

type Filter = 'all' | 'today' | 'not_completed';

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
        <Button
          className={cn('self-end', filter === 'all' && 'bg-primary')}
          variant="subtle"
          size="icon"
        >
          <ListFilterIcon className={cn('size-4', filter === 'all' && 'text-text-white')} />
        </Button>
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
