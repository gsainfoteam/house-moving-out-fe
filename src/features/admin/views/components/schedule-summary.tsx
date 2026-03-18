import dayjs from 'dayjs';
import { countBy } from 'es-toolkit';
import { useTranslation } from 'react-i18next';

import { ScheduleStatusBadge } from './schedule-status-badge';
import { InspectionType, type MoveOutScheduleWithSlots, type Target } from '../../viewmodels';

export function ScheduleSummary({
  schedule,
  targets,
}: {
  schedule: MoveOutScheduleWithSlots;
  targets: Target[];
}) {
  const { t } = useTranslation('admin');
  const maleCapacity = schedule.inspectionSlots[0].maleCapacity;
  const femaleCapacity = schedule.inspectionSlots[0].femaleCapacity;
  const counts = countBy(targets, (target) => {
    if (target.isPassed === true) return 'passed';
    if (target.lastInspectionTime) {
      if (target.inspectionType !== InspectionType.SOLO) return 'waiting';
      return 'solo_waiting';
    }
    if (target.inspectionType !== InspectionType.SOLO) return 'not_inspected';
    return 'solo_not_inspected';
  });

  return (
    <section className="flex flex-col gap-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 border-b border-gray-100 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-h2 text-text-black font-bold">{schedule.title}</h2>
          <ScheduleStatusBadge status={schedule.status} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <span className="text-sub text-text-gray">{t('schedule.detail.applicationTime')}</span>
          <p className="text-box text-text-black">
            {`${dayjs(schedule.applicationStartTime).format('l ddd LT')} ~ ${dayjs(schedule.applicationEndTime).format('l ddd LT')}`}
          </p>
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="text-sub text-text-gray">
            {t('schedule.create.summary.semester.label')}
          </span>
          <p className="text-box text-text-black">
            {schedule.currentSemester.year}{' '}
            {t(`schedule.create.summary.semester.${schedule.currentSemester.season.toLowerCase()}`)}
          </p>
        </div>
      </div>

      <div className="bg-bg-surface/60 grid grid-cols-4 gap-3 rounded-lg p-4">
        <div className="flex flex-col gap-0.5">
          <span className="text-sub text-text-gray">{t('schedule.detail.capacity.male')}</span>
          <span className="text-box text-text-black font-semibold">{maleCapacity}</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-sub text-text-gray">{t('schedule.detail.capacity.female')}</span>
          <span className="text-box text-text-black font-semibold">{femaleCapacity}</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-sub text-text-gray">{t('schedule.detail.inspectors.male')}</span>
          <span className="text-box text-text-black font-semibold">
            {Math.ceil(maleCapacity / 2)}
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-sub text-text-gray">{t('schedule.detail.inspectors.female')}</span>
          <span className="text-box text-text-black font-semibold">
            {Math.ceil(femaleCapacity / 2)}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-sub2 text-text-gray font-medium">{t('schedule.statistics.title')}</h3>
        <div className="grid grid-cols-3 gap-x-4 gap-y-2">
          <div className="text-box2 text-text-black flex justify-between">
            <span className="text-text-gray">{t('schedule.statistics.all_not_inspected')}</span>
            <span className="font-medium">
              {(counts.not_inspected ?? 0) + (counts.waiting ?? 0)}
            </span>
          </div>
          <div className="text-box2 text-text-black flex justify-between">
            <span className="text-text-gray">{t('schedule.statistics.all_single_target')}</span>
            <span className="font-medium">
              {(counts.solo_not_inspected ?? 0) + (counts.solo_waiting ?? 0)}
            </span>
          </div>
          <div className="text-box2 text-text-black flex justify-between">
            <span className="text-text-gray">{t('schedule.statistics.amount')}</span>
            <span className="font-medium">? / ?</span>
          </div>
          <div className="text-box2 text-text-black flex justify-between">
            <span className="text-text-gray">{t('schedule.statistics.all_waiting_target')}</span>
            <span className="font-medium">
              {(counts.waiting ?? 0) + (counts.solo_waiting ?? 0)}
            </span>
          </div>
          <div className="text-box2 text-text-black flex justify-between">
            <span className="text-text-gray">{t('schedule.statistics.all_passed')}</span>
            <span className="font-medium">{counts.passed ?? 0}</span>
          </div>
          <div className="text-box2 text-text-black flex justify-between">
            <span className="text-text-gray">{t('schedule.statistics.progress')}</span>
            <span className="font-medium">
              {Math.ceil(((counts.passed ?? 0) / targets.length) * 100)}%
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
