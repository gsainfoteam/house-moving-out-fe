import { useTransition } from 'react';

import { useParams } from '@tanstack/react-router';

import dayjs from 'dayjs';
import { countBy } from 'es-toolkit';
import { useTranslation } from 'react-i18next';

import { Button, Dialog, Loading } from '@/common/components';
import { overlay } from '@/common/lib';

import {
  useGetMoveOutScheduleQuery,
  useTargets,
  InspectionType,
  ApplicationStatus,
  useChangeScheduleStatus,
  ScheduleStatus,
} from '../../viewmodels';
import { ScheduleStatusBadge } from '../components';

function ChangeScheduleDialog({
  onChange,
  status,
  close,
}: {
  onChange: () => Promise<void>;
  status: ScheduleStatus;
  close: () => void;
}) {
  const { t } = useTranslation('admin');
  const [loading, startLoading] = useTransition();
  return (
    <Dialog.Root>
      <Dialog.Header>{t('schedule.detail.changeSchedule.title')}</Dialog.Header>
      <Dialog.Body>
        {t('schedule.detail.changeSchedule.description', {
          status: t(`schedule.status.${status.toLowerCase()}`),
        })}
      </Dialog.Body>
      <Dialog.Footer>
        <Dialog.Close asChild>
          <Button variant="failed">{t('schedule.detail.changeSchedule.cancel')}</Button>
        </Dialog.Close>
        <Button
          variant="default"
          disabled={loading}
          onClick={() => startLoading(() => onChange().then(close))}
          className="w-full"
        >
          {t('schedule.detail.changeSchedule.submit')}
        </Button>
      </Dialog.Footer>
    </Dialog.Root>
  );
}

export function ScheduleDetailFrame() {
  const { uuid } = useParams({ from: '/_auth-required/admin/schedules/$uuid/' });
  const { data: schedule, isNotFound, error } = useGetMoveOutScheduleQuery(uuid);
  const { data: targets, isNotFound: targetNotFound, error: targetError } = useTargets(uuid);
  const { t } = useTranslation('admin');
  const { changeScheduleStatus, isPending: updatingStatus } = useChangeScheduleStatus(uuid);

  if (isNotFound || targetNotFound)
    return <div className="p-4">{t('schedule.detail.notFound')}</div>;
  if (error || targetError) return <div className="p-4">{t('schedule.detail.error')}</div>;
  if (!schedule || !targets) return <Loading containerClassName="h-full" />;

  const counts = countBy(targets, (target) => {
    if (target.inspectionType === InspectionType.EMPTY) return 'empty';
    if (target.status === ApplicationStatus.PASSED) return 'passed';
    if (target.lastInspectionTime) {
      if (target.inspectionType !== InspectionType.SOLO) return 'waiting';
      return 'solo_waiting';
    }
    if (target.inspectionType !== InspectionType.SOLO) return 'not_inspected';
    return 'solo_not_inspected';
  });
  const genderCounts = countBy(
    targets.filter((t) => t.inspectionType !== InspectionType.EMPTY),
    (target) => target.gender,
  );

  const changeSchedule = (status: ScheduleStatus) => () => {
    overlay.open(({ close }) => (
      <ChangeScheduleDialog
        onChange={() => changeScheduleStatus(status).catch(() => {})}
        status={status}
        close={close}
      />
    ));
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <section className="border-border bg-bg flex flex-col gap-5 rounded-xl border p-5">
        <div className="flex justify-between gap-3 border-b border-gray-100 pb-4">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-body-lg text-text-primary font-bold">{schedule.title}</h2>
            <ScheduleStatusBadge status={schedule.status} />
          </div>
          <div className="flex gap-2">
            {schedule.status === ScheduleStatus.DRAFT && (
              <Button
                variant="outline"
                disabled={updatingStatus}
                onClick={changeSchedule(ScheduleStatus.ACTIVE)}
              >
                {t('schedule.detail.active')}
              </Button>
            )}
            {(schedule.status === ScheduleStatus.DRAFT ||
              schedule.status === ScheduleStatus.ACTIVE) && (
              <Button
                variant="failed"
                disabled={updatingStatus}
                onClick={changeSchedule(ScheduleStatus.CANCELED)}
              >
                {t('schedule.detail.canceled')}
              </Button>
            )}
            {schedule.status === ScheduleStatus.ACTIVE && (
              <Button
                variant="outline"
                disabled={updatingStatus}
                onClick={changeSchedule(ScheduleStatus.COMPLETED)}
              >
                {t('schedule.detail.completed')}
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <span className="text-label text-text-secondary">
              {t('schedule.detail.applicationTime')}
            </span>
            <p className="text-body-lg text-text-primary">
              {`${dayjs(schedule.applicationStartTime).format('l ddd LT')} ~ ${dayjs(schedule.applicationEndTime).format('l ddd LT')}`}
            </p>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-label text-text-secondary">
              {t('schedule.create.summary.semester.label')}
            </span>
            <p className="text-body-lg text-text-primary">
              {schedule.currentSemester.year}{' '}
              {t(
                `schedule.create.summary.semester.${schedule.currentSemester.season.toLowerCase()}`,
              )}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-body text-text-secondary font-medium">
            {t('schedule.statistics.title')}
          </h3>
          <div className="grid grid-cols-3 gap-x-4 gap-y-2">
            <div className="text-body text-text-primary flex justify-between">
              <span className="text-text-secondary">
                {t('schedule.statistics.all_not_inspected')}
              </span>
              <span className="font-medium">
                {(counts.not_inspected ?? 0) + (counts.waiting ?? 0)}
              </span>
            </div>
            <div className="text-body text-text-primary flex justify-between">
              <span className="text-text-secondary">
                {t('schedule.statistics.all_single_target')}
              </span>
              <span className="font-medium">
                {(counts.solo_not_inspected ?? 0) + (counts.solo_waiting ?? 0)}
              </span>
            </div>
            <div className="text-body text-text-primary flex justify-between">
              <span className="text-text-secondary">{t('schedule.statistics.count')}</span>
              <span className="font-medium">
                {genderCounts.MALE ?? 0} / {genderCounts.FEMALE ?? 0}
              </span>
            </div>
            <div className="text-body text-text-primary flex justify-between">
              <span className="text-text-secondary">
                {t('schedule.statistics.all_waiting_target')}
              </span>
              <span className="font-medium">
                {(counts.waiting ?? 0) + (counts.solo_waiting ?? 0)}
              </span>
            </div>
            <div className="text-body text-text-primary flex justify-between">
              <span className="text-text-secondary">{t('schedule.statistics.all_passed')}</span>
              <span className="font-medium">{counts.passed ?? 0}</span>
            </div>
            <div className="text-body text-text-primary flex justify-between">
              <span className="text-text-secondary">{t('schedule.statistics.progress')}</span>
              <span className="font-medium">
                {targets.length ? Math.ceil(((counts.passed ?? 0) / targets.length) * 100) : 0}%
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
