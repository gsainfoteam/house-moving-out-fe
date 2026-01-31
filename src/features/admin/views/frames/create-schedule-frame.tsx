import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import { Button, Input } from '@/common/components';

import { useCreateScheduleForm } from '../../viewmodels';

export function CreateScheduleFrame() {
  const { t } = useTranslation('admin');
  const { register, onSubmit, semester, isSubmitting, inspectionTimeRange } =
    useCreateScheduleForm();

  return (
    <div className="p-4">
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <div>
          {t('schedule.create.title.label')}:
          <Input placeholder={t('schedule.create.title.placeholder')} {...register('title')} />
        </div>
        <div>
          {t('schedule.create.applicationStartTime.label')}:
          <Input type="datetime-local" {...register('applicationStartTime')} />
        </div>
        <div>
          {t('schedule.create.inspectionStartWeek.label')}:
          <Input type="date" {...register('inspectionStartWeek')} />
        </div>
        <div>
          {t('schedule.create.excel.label')}
          <Input
            type="file"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            {...register('file')}
          />
        </div>
        <div>
          <div>{t('schedule.create.summary.label')}</div>
          <ul className="list-disc pl-4">
            <li>
              {t('schedule.create.summary.semester.label')}: {semester}
            </li>
            <li>
              {t('schedule.create.summary.slots.label')}:
              <div className="pl-2">
                {inspectionTimeRange.map(({ start }) => (
                  <div key={start}>{dayjs(start).format('dddd HH:mm')}</div>
                ))}
              </div>
            </li>
          </ul>
        </div>
        <Button disabled={isSubmitting}>{t('schedule.create.action')}</Button>
      </form>
    </div>
  );
}
