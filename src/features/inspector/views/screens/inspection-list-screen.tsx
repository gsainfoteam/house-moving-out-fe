import { Link } from '@tanstack/react-router';

import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import { LayoutCard } from '@/common/components';

import { ApplicationStatus } from '../../viewmodels';
import { InspectionScheduleCard } from '../components';

export function InspectionListScreen({ targets, isLoading }: InspectionListScreen.Props) {
  const { t } = useTranslation('inspector');

  return (
    <LayoutCard.Root isLoading={isLoading}>
      <LayoutCard.Header>
        <LayoutCard.Text>
          <LayoutCard.Title>{t('list.title')}</LayoutCard.Title>
          <LayoutCard.Description>{t('list.description')}</LayoutCard.Description>
        </LayoutCard.Text>
      </LayoutCard.Header>
      <LayoutCard.Body className="gap-3">
        {targets.map((target) => (
          <Link
            key={target.uuid}
            to="/inspector/$uuid"
            params={{ uuid: target.uuid }}
            className="w-full"
            disabled={
              target.status === ApplicationStatus.PASSED ||
              target.status === ApplicationStatus.FAILED ||
              target.status === ApplicationStatus.NO_SHOW
            }
          >
            <InspectionScheduleCard
              time={dayjs(target.inspectionTime)}
              roomLabel={target.roomNumber}
              residentName={target.residents.map((r) => r.name).join(', ')}
              status={target.status}
            />
          </Link>
        ))}
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
