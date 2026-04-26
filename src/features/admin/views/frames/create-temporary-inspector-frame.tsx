import { useParams } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import { Button, Input, Loading } from '@/common/components';

import {
  Gender,
  useCreateTemporaryInspectorForm,
  useGetMoveOutScheduleQuery,
  useInspectorsOfSchedule,
} from '../../viewmodels';

export function CreateTemporaryInspectorFrame() {
  const { t } = useTranslation('admin');
  const { uuid } = useParams({
    from: '/_auth-required/admin/schedules/$uuid/inspectors/temporary',
  });
  const { register, onSubmit, isSubmitting, setGender, gender, errors } =
    useCreateTemporaryInspectorForm(uuid);
  const { data: inspectors, isNotFound: isInspectorsNotFound } = useInspectorsOfSchedule(uuid);
  const { data: schedule, isNotFound: isScheduleNotFound } = useGetMoveOutScheduleQuery(uuid);

  if (isScheduleNotFound || isInspectorsNotFound)
    return <div className="p-4">{t('inspectors.error.notFound')}</div>;
  if (!schedule || !inspectors) return <Loading />;

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
      <Button disabled={isSubmitting} className="mt-auto">
        {t('inspectors.create.action')}
      </Button>
    </form>
  );
}
