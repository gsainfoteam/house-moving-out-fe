import { Link } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import { Button, Loading } from '@/common/components';

import { useFindAllMoveOutSchedules } from '../../viewmodels';
import { ScheduleCard } from '../components';

export function ScheduleListFrame() {
  const { data: schedules } = useFindAllMoveOutSchedules();
  const { t } = useTranslation('admin');

  if (!schedules) return <Loading />;

  return (
    <main className="flex flex-1 flex-col gap-4 p-4">
      {schedules.length > 0 ? (
        schedules.map((schedule) => (
          <Link key={schedule.uuid} to="/admin/schedules/$uuid" params={{ uuid: schedule.uuid }}>
            <ScheduleCard schedule={schedule} />
          </Link>
        ))
      ) : (
        <div>{t('schedule.empty')}</div>
      )}
      <Button asChild className="mt-auto">
        <Link to="/admin/schedules/new">{t('schedule.create.action')}</Link>
      </Button>
    </main>
  );
}
