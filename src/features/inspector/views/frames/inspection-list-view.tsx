import { Link } from '@tanstack/react-router';

import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import { LayoutCard } from '@/common/components';

import { InspectionScheduleCard } from '../components';

export function InspectionListView({ targets, isLoading }: InspectionListView.Props) {
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
            disabled={target.isPassed !== null}
          >
            <InspectionScheduleCard
              time={dayjs(target.inspectionTime)}
              roomLabel={target.roomNumber}
              residentName={target.residents.map((r) => r.name).join(', ')}
              isPassed={target.isPassed}
            />
          </Link>
        ))}
      </LayoutCard.Body>
    </LayoutCard.Root>
  );
}

export namespace InspectionListView {
  export type Target = {
    uuid: string;
    inspectionTime: string;
    roomNumber: string;
    residents: { name: string }[];
    isPassed: boolean | null;
  };

  export type Props = {
    targets: Target[];
    isLoading: boolean;
  };
}
