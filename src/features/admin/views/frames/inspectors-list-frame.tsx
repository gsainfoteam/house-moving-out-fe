import { Link, useParams } from '@tanstack/react-router';

import dayjs from 'dayjs';
import { Trash } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button, Loading } from '@/common/components';

import { Gender } from '../../models';
import {
  useDeleteInspector,
  useGetMoveOutScheduleQuery,
  useInspectorsOfSchedule,
} from '../../viewmodels';
import { SlotVisualize } from '../components';
import { getTimeRange } from '../utils';

export function InspectorsListFrame() {
  const { uuid } = useParams({ from: '/admin/schedules/$uuid/inspectors/' });
  const { data: inspectors, isNotFound: isInspectorsNotFound } = useInspectorsOfSchedule(uuid);
  const { t } = useTranslation('admin');
  const { data: schedule, isNotFound: isScheduleNotFound } = useGetMoveOutScheduleQuery(uuid);
  const { mutate: deleteInspector } = useDeleteInspector();

  if (isScheduleNotFound || isInspectorsNotFound)
    return <div className="p-4">{t('schedule.detail.notFound')}</div>;
  if (!schedule || !inspectors) return <Loading containerClassName="h-auto flex-1" />;

  const maleSlotTimes = inspectors
    .filter((i) => i.gender === Gender.MALE)
    .flatMap((i) => i.availableSlots.map((s) => dayjs(s.startTime)));
  const femaleSlotTimes = inspectors
    .filter((i) => i.gender === Gender.FEMALE)
    .flatMap((i) => i.availableSlots.map((s) => dayjs(s.startTime)));

  return (
    <div className="flex flex-col gap-4 p-4">
      <div>
        <table className="w-full text-center [&_td,&_th]:border [&_td,&_th]:px-1">
          <thead>
            <tr>
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
                <td>{i.gender}</td>
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
          slots={schedule.inspectionSlots.map((s) => ({
            ...s,
            reservedCount:
              Math.ceil(s.maleCapacity / 2) -
              maleSlotTimes.filter((st) => st.isSame(s.startTime)).length,
          }))}
        />
        <SlotVisualize
          title={t('inspectors.list.summary.female')}
          capacity={null}
          slots={schedule.inspectionSlots.map((s) => ({
            ...s,
            reservedCount:
              Math.ceil(s.femaleCapacity / 2) -
              femaleSlotTimes.filter((st) => st.isSame(s.startTime)).length,
          }))}
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
