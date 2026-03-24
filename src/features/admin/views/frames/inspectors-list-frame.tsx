import { Link, useParams } from '@tanstack/react-router';

import dayjs from 'dayjs';
import { countBy } from 'es-toolkit';
import { Trash } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button, Loading } from '@/common/components';

import {
  Gender,
  useDeleteInspector,
  useGetMoveOutScheduleQuery,
  useInspectorsOfSchedule,
  type Inspector,
  type MoveOutScheduleWithSlots,
} from '../../viewmodels';
import { SlotVisualize } from '../components';
import { getTimeRange } from '../utils';

const getRequiredCountSlots = (
  schedule: MoveOutScheduleWithSlots,
  inspectors: Inspector[],
  gender: Gender,
) => {
  const slots = inspectors.filter((i) => i.gender === gender).flatMap((i) => i.availableSlots);
  const slotTimes = slots.map((s) => dayjs(s.startTime));
  const counts = countBy(slotTimes, (t) => t.format());
  return schedule.inspectionSlots
    .filter((s) => s.gender === gender)
    .map((s) => ({
      ...s,
      reservedCount: Math.ceil(s.capacity / 2) - (counts[dayjs(s.startTime).format()] ?? 0),
    }));
};

export function InspectorsListFrame() {
  const { uuid } = useParams({ from: '/_auth-required/admin/schedules/$uuid/inspectors/' });
  const { data: inspectors, isNotFound: isInspectorsNotFound } = useInspectorsOfSchedule(uuid);
  const { t } = useTranslation('admin');
  const { data: schedule, isNotFound: isScheduleNotFound } = useGetMoveOutScheduleQuery(uuid);
  const { mutate: deleteInspector } = useDeleteInspector();

  if (isScheduleNotFound || isInspectorsNotFound)
    return <div className="p-4">{t('schedule.detail.notFound')}</div>;
  if (!schedule || !inspectors) return <Loading containerClassName="h-full" />;

  const maleSlots = getRequiredCountSlots(schedule, inspectors, Gender.MALE);
  const femaleSlots = getRequiredCountSlots(schedule, inspectors, Gender.FEMALE);

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="bg-bg overflow-hidden rounded-xl border border-border">
        <table className="w-full text-center [&_td,&_th]:border [&_td,&_th]:border-border [&_td,&_th]:px-3 [&_td,&_th]:py-2">
          <thead>
            <tr className="bg-bg-surface/80 [&_th]:text-text-primary [&_th]:font-medium">
              <th>{t('inspectors.create.name.label')}</th>
              <th>{t('inspectors.create.email.label')}</th>
              <th>{t('inspectors.create.studentNumber.label')}</th>
              <th>{t('inspectors.create.gender.label')}</th>
              <th>{t('inspectors.create.slots.label')}</th>
              <th>{t('inspectors.list.actions.label')}</th>
            </tr>
          </thead>
          <tbody>
            {inspectors.map((i) => (
              <tr key={i.uuid}>
                <td>{i.name}</td>
                <td>{i.email}</td>
                <td>{i.studentNumber}</td>
                <td>{t(`gender.${i.gender.toLowerCase()}`)}</td>
                <td className="whitespace-pre-wrap">
                  {getTimeRange(
                    i.availableSlots.map((s) => ({
                      start: dayjs(s.startTime),
                      end: dayjs(s.endTime),
                    })),
                  )
                    .map((r) => `${r.start.format('ddd HH:mm')}~${r.end.format('ddd HH:mm')}`)
                    .join('\n')}
                </td>
                <td className="py-1">
                  <div className="flex justify-center">
                    <Button
                      size="icon"
                      className="bg-red-600"
                      onClick={() =>
                        // TODO: add confirm modal after HMF-36
                        deleteInspector({ params: { path: { id: i.uuid } } })
                      }
                    >
                      <Trash />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex gap-2">
        <SlotVisualize
          title={t('inspectors.list.summary.male')}
          capacity={null}
          slots={maleSlots}
        />
        <SlotVisualize
          title={t('inspectors.list.summary.female')}
          capacity={null}
          slots={femaleSlots}
        />
      </div>
      <Button asChild>
        <Link to="/admin/schedules/$uuid/inspectors/new" params={{ uuid }}>
          {t('inspectors.create.action')}
        </Link>
      </Button>
    </div>
  );
}
