import { useNavigate } from '@tanstack/react-router';

import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import { LayoutCard } from '@/common/components';

import { useGetInspectionTargets } from '../../viewmodels';
import { InspectionScheduleCard } from '../components';

export function InspectionListFrame() {
  const { t } = useTranslation('inspector');
  const { targets, isLoading } = useGetInspectionTargets();
  const navigate = useNavigate();

  return (
    <LayoutCard.Root isLoading={isLoading}>
      <LayoutCard.Header>
        <LayoutCard.Text>
          <LayoutCard.Title>{t('list.title')}</LayoutCard.Title>
          <LayoutCard.Description>{t('list.description')}</LayoutCard.Description>
        </LayoutCard.Text>
      </LayoutCard.Header>
      <LayoutCard.Body className="gap-3">
        {targets?.map((target) => (
          <InspectionScheduleCard
            key={target.uuid}
            time={dayjs(target.inspectionTime)}
            roomLabel={target.roomNumber}
            residentName={target.residents.map((resident) => resident.name).join(', ')}
            isPassed={target.isPassed}
            onClick={() => navigate({ to: '/inspector/$uuid', params: { uuid: target.uuid } })}
          />
        ))}
      </LayoutCard.Body>
    </LayoutCard.Root>
  );
}
