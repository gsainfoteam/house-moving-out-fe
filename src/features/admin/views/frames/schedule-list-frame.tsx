import { Link } from '@tanstack/react-router';

import { Calendar } from 'lucide-react';
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
    <main className="flex min-h-0 flex-1 flex-col gap-4 p-4">
      <list.Root className="min-h-0 flex-1 gap-4">
        <list.Empty
          icon={<Calendar />}
          title={t('schedule.empty')}
          description={t('schedule.emptyDescription')}
        />
        <list.Builder className="gap-4">
          {(schedule) => (
            <Link key={schedule.uuid} to="/admin/schedules/$uuid" params={{ uuid: schedule.uuid }}>
              <ScheduleCard schedule={schedule} />
            </Link>
          )}
        </list.Builder>
      </list.Root>
      <Button asChild className="mt-auto">
        <Link to="/admin/schedules/new">{t('schedule.create.action')}</Link>
      </Button>
    </main>
  );
}
