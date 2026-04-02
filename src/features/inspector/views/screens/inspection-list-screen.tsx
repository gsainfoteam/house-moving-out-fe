import { Link } from '@tanstack/react-router';

import dayjs from 'dayjs';
import { Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { LayoutCard, useList } from '@/common/components';

import { type ApplicationStatus } from '../../viewmodels';
import { InspectionScheduleCard } from '../components';

export function InspectionListScreen({ targets, isLoading }: InspectionListScreen.Props) {
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
  };
}
