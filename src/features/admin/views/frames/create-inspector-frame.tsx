import { useParams } from '@tanstack/react-router';

import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import { Button, Input, Loading } from '@/common/components';

import { Gender } from '../../models';
import {
  useCreateInspectorForm,
  useGetMoveOutScheduleQuery,
  useInspectorsOfSchedule,
} from '../../viewmodels';
import { SlotVisualize } from '../components';
import { getTimeRange } from '../utils';

export function CreateInspectorFrame() {
  const { t } = useTranslation('admin');
  const { uuid } = useParams({ from: '/_auth-required/admin/schedules/$uuid/inspectors/new' });
  const { register, onSubmit, isSubmitting, setGender, gender, errors, toggleSlot, slots } =
    useCreateInspectorForm();
  const { data: inspectors, isNotFound: isInspectorsNotFound } = useInspectorsOfSchedule(uuid);
  const { data: schedule, isNotFound: isScheduleNotFound } = useGetMoveOutScheduleQuery(uuid);

  if (isScheduleNotFound || isInspectorsNotFound)
    return <div className="p-4">{t('inspectors.error.notFound')}</div>;
  if (!schedule || !inspectors) return <Loading />;

  const slotTimes = inspectors
    .filter((i) => i.gender === gender)
    .flatMap((i) => i.availableSlots.map((s) => dayjs(s.startTime)));

  const capacity =
    gender === Gender.MALE
      ? schedule.inspectionSlots[0].maleCapacity
      : schedule.inspectionSlots[0].femaleCapacity;

  return (
    <form className="flex flex-1 flex-col gap-4 p-4" onSubmit={onSubmit}>
      <div>
        <label>
          {t('inspectors.create.name.label')}:
          <Input
            error={errors.name?.message}
            placeholder={t('inspectors.create.name.placeholder')}
            {...register('name')}
          />
        </label>
      </div>
      <div>
        <label>
          {t('inspectors.create.email.label')}:
          <Input
            error={errors.email?.message}
            placeholder={t('inspectors.create.email.placeholder')}
            {...register('email')}
          />
        </label>
      </div>
      <div>
        <label>
          {t('inspectors.create.gender.label')}:
          <div className="flex gap-2">
            <Button
              type="button"
              variant={gender === Gender.MALE ? 'default' : 'outline'}
              onClick={() => setGender(Gender.MALE)}
            >
              {t('gender.male')}
            </Button>
            <Button
              type="button"
              variant={gender === Gender.FEMALE ? 'default' : 'outline'}
              onClick={() => setGender(Gender.FEMALE)}
            >
              {t('gender.female')}
            </Button>
          </div>
        </label>
      </div>
      <div>
        <label>
          {t('inspectors.create.studentNumber.label')}
          <Input
            error={errors.studentNumber?.message}
            placeholder={t('inspectors.create.studentNumber.placeholder')}
            {...register('studentNumber')}
          />
        </label>
      </div>
      <div>
        <label>{t('inspectors.create.slots.label')}</label>
        {gender && (
          <SlotVisualize
            onClick={toggleSlot}
            selectedSlots={slots}
            title={t(`gender.${gender.toLowerCase()}`)}
            capacity={null}
            slots={schedule.inspectionSlots.map((s) => ({
              ...s,
              reservedCount:
                Math.ceil(capacity / 2) - slotTimes.filter((st) => st.isSame(s.startTime)).length,
            }))}
          />
        )}
      </div>
      <div>
        <div>{t('inspectors.create.summary.label')}</div>
        <ul className="list-disc pl-4">
          <li>
            {t('inspectors.create.slots.label')}:{' '}
            {getTimeRange(
              schedule.inspectionSlots
                .filter((i) => slots.includes(i.uuid))
                .map((i) => ({
                  start: dayjs(i.startTime),
                  end: dayjs(i.endTime),
                })),
            )
              .map((r) => `${r.start.format('ddd HH:mm')}~${r.end.format('ddd HH:mm')}`)
              .join(', ')}
          </li>
        </ul>
      </div>
      <Button disabled={isSubmitting} className="mt-auto">
        {t('inspectors.create.action')}
      </Button>
    </form>
  );
}
