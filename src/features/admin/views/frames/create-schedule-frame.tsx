import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import { Button, Input } from '@/common/components';

import { useCreateScheduleForm } from '../../viewmodels';

export function CreateScheduleFrame() {
  const { t } = useTranslation('admin');
  const { register, onSubmit, yearSemester, isSubmitting, inspectionTimeRange } =
    useCreateScheduleForm();

  return (
    <form className="flex min-h-dvh flex-col gap-4 p-4" onSubmit={onSubmit}>
      <div>
        <label>
          {t('schedule.create.title.label')}:
          <Input placeholder={t('schedule.create.title.placeholder')} {...register('title')} />
        </label>
      </div>
      <div>
        <label>
          {t('schedule.create.applicationStartTime.label')}:
          <Input type="datetime-local" {...register('applicationStartTime')} />
        </label>
      </div>
      <div>
        <label>
          {t('schedule.create.inspectionStartWeek.label')}:
          <Input type="date" {...register('inspectionStartWeek')} />
        </label>
      </div>
      <div>
        <label>
          {t('schedule.create.excel.label')}
          <Input
            type="file"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            {...register('file')}
          />
        </label>
      </div>
      <div>
        <div>{t('schedule.create.summary.label')}</div>
        <ul className="list-disc pl-4">
          <li>
            {/* 
                t('schedule.create.summary.semester.spring')
                t('schedule.create.summary.semester.summer')
                t('schedule.create.summary.semester.fall')
                t('schedule.create.summary.semester.winter')
               */}
            {t('schedule.create.summary.semester.label')}:{' '}
            {yearSemester
              ? `${yearSemester.year} ${t(`schedule.create.summary.semester.${yearSemester.semester}`)}`
              : undefined}
          </li>
          <li>
            {t('schedule.create.summary.slots.label')}:
            <div className="grid grid-cols-4 pl-2">
              {inspectionTimeRange.map(({ start }) => (
                <div key={start}>{dayjs(start).format('MM/DD dd, HH:mm')}</div>
              ))}
            </div>
          </li>
        </ul>
      </div>
      <Button disabled={isSubmitting} className="mt-auto">
        {t('schedule.create.action')}
      </Button>
    </form>
  );
}
