import { useParams } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import { Button, Input } from '@/common/components';

import { Gender } from '../../models';
import { useCreateInspectorForm, useInspectorsOfSchedule } from '../../viewmodels';

export function CreateInspectorFrame() {
  const { t } = useTranslation('admin');
  const { uuid } = useParams({ from: '/admin/schedules/$uuid/inspectors/new' });
  const { register, onSubmit, isSubmitting, setGender, gender, errors } = useCreateInspectorForm();
  const { data: schedule } = useInspectorsOfSchedule(uuid);

  return (
    <form className="flex min-h-dvh flex-col gap-4 p-4" onSubmit={onSubmit}>
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
        <div>{t('schedule.create.summary.label')}</div>
        <ul className="list-disc pl-4"></ul>
      </div>
      <Button disabled={isSubmitting} className="mt-auto">
        {t('schedule.create.action')}
      </Button>
    </form>
  );
}
