import { useTranslation } from 'react-i18next';

import { Button, Input } from '@/common/components';

import { useCreateScheduleForm } from '../../viewmodels';
import { SlotVisualize } from '../components';

export function CreateScheduleFrame() {
  const { t } = useTranslation('admin');
  const {
    register,
    onSubmit,
    yearSemester,
    isSubmitting,
    inspectionTemplates,
    inspectionTimeRange,
    errors,
    toggleTimeRange,
  } = useCreateScheduleForm();

  return (
    <div className="flex flex-1 flex-col">
      <form className="flex flex-1 flex-col gap-4 p-4" onSubmit={onSubmit}>
        <div>
          <label>
            {t('schedule.create.title.label')}:
            <Input
              error={errors.title?.message}
              placeholder={t('schedule.create.title.placeholder')}
              {...register('title')}
            />
          </label>
        </div>
        <div>
          <label>
            {t('schedule.create.applicationStartTime.label')}:
            <Input
              error={errors.applicationStartTime?.message}
              type="datetime-local"
              {...register('applicationStartTime')}
            />
          </label>
        </div>
        <div>
          <label>
            {t('schedule.create.inspectionStartWeek.label')}:
            <Input
              error={errors.inspectionStartWeek?.message}
              type="date"
              {...register('inspectionStartWeek')}
            />
          </label>
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
        </div>
        <div>
          <label>
            {t('schedule.create.currentSemesterFile.label')}
            <Input
              error={errors.currentSemesterFile?.message}
              type="file"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              {...register('currentSemesterFile')}
            />
          </label>
        </div>
        <div>
          <label>
            {t('schedule.create.nextSemesterFile.label')}
            <Input
              error={errors.nextSemesterFile?.message}
              type="file"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              {...register('nextSemesterFile')}
            />
          </label>
        </div>
        {inspectionTemplates && (
          <div>
            <SlotVisualize
              onClick={toggleTimeRange}
              selectedSlots={inspectionTimeRange}
              slots={inspectionTemplates.map((d) => ({
                uuid: d.toISOString(),
                startTime: d,
                reservedCount: 0,
              }))}
              title={t('schedule.create.summary.slots.label')}
              capacity={null}
            />
          </div>
        )}
        <Button disabled={isSubmitting} className="mt-auto">
          {t('schedule.create.action')}
        </Button>
      </form>
    </div>
  );
}
