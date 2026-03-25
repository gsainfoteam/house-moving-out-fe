import { Link } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import { Button, Loading, useList } from '@/common/components';

import { useFindAllMoveOutSchedules } from '../../viewmodels';
import { ScheduleCard } from '../components';

export function ScheduleListFrame() {
  const { data: schedules } = useFindAllMoveOutSchedules();
  const { t } = useTranslation('admin');
  const list = useList(schedules ?? []);

  if (!schedules) return <Loading containerClassName="w-full h-auto" />;

  return (
    <main className="flex flex-1 flex-col gap-4 p-4">
      <list.Empty>
        <p className="text-body text-text-secondary">{t('schedule.empty')}</p>
      </list.Empty>
      <list.Content>
        {(schedule) => (
          <Link key={schedule.uuid} to="/admin/schedules/$uuid" params={{ uuid: schedule.uuid }}>
            <ScheduleCard schedule={schedule} />
          </Link>
        )}
      </list.Content>
      <Button asChild className="mt-auto">
        <Link to="/admin/schedules/new">{t('schedule.create.action')}</Link>
      </Button>
    </main>
  );
}
