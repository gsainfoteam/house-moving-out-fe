import { Link } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import { Button } from '@/common/components';

import { useFindAllMoveOutSchedules } from '../../viewmodels';
import { ScheduleCard } from '../components/schedule-card';

export function ScheduleListFrame() {
  const { data: schedules } = useFindAllMoveOutSchedules();
  const { t } = useTranslation('admin');

  return (
    <div className="p-4">
      {schedules ? (
        <div className="flex flex-col gap-4 p-4">
          {schedules.length > 0 ? (
            schedules.map((schedule) => <ScheduleCard schedule={schedule} key={schedule.uuid} />)
          ) : (
            <div>{t('schedule.empty')}</div>
          )}
          <Button asChild>
            <Link to="/admin/schedules/new">{t('schedule.create.action')}</Link>
          </Button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
