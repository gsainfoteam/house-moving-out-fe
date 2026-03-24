import { useTranslation } from 'react-i18next';

import { Button, Input } from '@/common/components';
import { cn } from '@/common/utils';

import { Gender, useCreateScheduleForm } from '../../viewmodels';
import { SlotVisualize } from '../components';

const houseList = ['G', 'I', 'S', 'T'] as const;
const floorList = [1, 2, 3, 4, 5, 6] as const;

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
    residentGenderByHouseFloorKey,
    toggleResidentGenderByHouseFloorKey,
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
        <div className="flex flex-col gap-2">
          <label>
            {t('schedule.create.inspectionStartWeek.label')}:
            <Input
              error={errors.inspectionStartWeek?.message}
              type="date"
              {...register('inspectionStartWeek')}
            />
          </label>
          <div>
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
        </div>
        <div className="flex gap-2">
          <label className="flex-1">
            {t('schedule.create.currentSemesterFile.label')}
            <Input
              error={errors.currentSemesterFile?.message}
              type="file"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              {...register('currentSemesterFile')}
            />
          </label>
          <label className="flex-1">
            {t('schedule.create.nextSemesterFile.label')}
            <Input
              error={errors.nextSemesterFile?.message}
              type="file"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              {...register('nextSemesterFile')}
            />
          </label>
        </div>
        <div className="flex flex-col gap-2">
          <div>{t('schedule.create.genderByFloor.label')}</div>
          <table className="w-fit text-center [&_td,&_th]:border [&_td,&_th]:border-border [&_td,&_th]:px-2 [&_td,&_th]:py-2">
            <thead>
              <tr>
                <th>{t('schedule.create.genderByFloor.house')}</th>
                {floorList.map((floor) => (
                  <th key={floor}>{floor}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {houseList.map((house) => (
                <tr key={house}>
                  <th>{house}</th>
                  {floorList.map((floor) => {
                    const key = `${house}${floor}`;
                    const value = residentGenderByHouseFloorKey?.[key] ?? Gender.MALE;
                    const isMale = value === Gender.MALE;
                    if (house === 'S' && floor === 1) return <td key={key} />;
                    return (
                      <td key={key}>
                        <Button
                          type="button"
                          className={cn(
                            'min-w-14',
                            isMale
                              ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                              : 'bg-pink-100 text-pink-700 hover:bg-pink-200',
                          )}
                          onClick={() => toggleResidentGenderByHouseFloorKey(key)}
                        >
                          {isMale
                            ? t('schedule.create.genderByFloor.male')
                            : t('schedule.create.genderByFloor.female')}
                        </Button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
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
