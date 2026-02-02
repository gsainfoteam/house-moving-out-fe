import { Link, useParams } from '@tanstack/react-router';

import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import { Button, Loading } from '@/common/components';

import { useGetMoveOutScheduleQuery } from '../../viewmodels';
import { SlotSummary } from '../components/slot-summary';

export function ScheduleDetailFrame() {
  const { uuid } = useParams({ from: '/admin/schedules/$uuid/' });
  const { data: schedule, error } = useGetMoveOutScheduleQuery(uuid);
  const { t } = useTranslation('admin');

  if (error) return <div className="p-4">{t('schedule.detail.notFound')}</div>;
  if (!schedule) return <Loading />;

  return (
    <div className="flex flex-col gap-4 p-4">
      <div>
        <div>ID: {schedule.uuid}</div>
        <div>
          {t('schedule.create.title.label')}: {schedule.title}
        </div>
        <div>
          {t('schedule.detail.status')}: {schedule.status}
        </div>
        <div>
          {t('schedule.detail.applicationTime')}:{' '}
          {`${dayjs(schedule.applicationStartTime).format('LLLL')} ~ ${dayjs(schedule.applicationEndTime).format('LLLL')}`}
        </div>
        <div>
          {t('schedule.create.summary.semester.label')}: {schedule.currentSemester.season}
        </div>
      </div>
      <div className="flex gap-2">
        <SlotSummary slots={schedule.inspectionSlots} type="male" />
        <SlotSummary slots={schedule.inspectionSlots} type="female" />
      </div>
      <Button asChild>
        <Link to="/admin/schedules/$uuid/inspectors" params={{ uuid }}>
          {t('inspectors.list')}
        </Link>
      </Button>
    </div>
  );
}
