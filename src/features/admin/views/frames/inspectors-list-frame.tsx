import { Link, useParams } from '@tanstack/react-router';

import dayjs from 'dayjs';
import { Trash } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button, Loading } from '@/common/components';

import { Gender } from '../../models';
import { useGetMoveOutScheduleQuery, useInspectorsOfSchedule } from '../../viewmodels';
import { SlotVisualize } from '../components/slot-visualize';

export function InspectorsListFrame() {
  const { uuid } = useParams({ from: '/admin/schedules/$uuid/inspectors/' });
  const { data: inspectors, error: inspectorsError } = useInspectorsOfSchedule(uuid);
  const { t } = useTranslation('admin');
  const { data: schedule, error: scheduleError } = useGetMoveOutScheduleQuery(uuid);

  if (scheduleError || inspectorsError)
    return <div className="p-4">{t('schedule.detail.notFound')}</div>;
  if (!schedule || !inspectors) return <Loading />;

  const maleSlotTimes = inspectors
    .filter((i) => i.gender === Gender.MALE)
    .flatMap((i) => i.availableSlots.map((s) => dayjs(s.startTime)));
  const femaleSlotTimes = inspectors
    .filter((i) => i.gender === Gender.FEMALE)
    .flatMap((i) => i.availableSlots.map((s) => dayjs(s.startTime)));

  return (
    <div className="flex flex-col gap-4 p-4">
      <div>
        <table className="w-full text-center [&_td,th]:border [&_td,th]:px-1">
          <thead>
            <tr>
              <th>{t('inspectors.create.name.label')}</th>
              <th>{t('inspectors.create.email.label')}</th>
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
                <td>{i.gender}</td>
                <td>{i.availableSlots.map((i) => dayjs(i.startTime)).map((t) => t.format())}</td>
                <td className="py-1">
                  <div className="flex justify-center">
                    <Button size="icon" className="bg-red-600">
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
          inverseMode
          title="male"
          capacity={schedule.inspectionSlots[0].maleCapacity}
          slots={schedule.inspectionSlots.map((s) => ({
            ...s,
            reservedCount:
              s.maleCapacity - maleSlotTimes.filter((t) => t.isSame(s.startTime)).length * 2,
          }))}
        />
        <SlotVisualize
          inverseMode
          title="female"
          capacity={schedule.inspectionSlots[0].femaleCapacity}
          slots={schedule.inspectionSlots.map((s) => ({
            ...s,
            reservedCount:
              s.femaleCapacity - femaleSlotTimes.filter((t) => t.isSame(s.startTime)).length * 2,
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
