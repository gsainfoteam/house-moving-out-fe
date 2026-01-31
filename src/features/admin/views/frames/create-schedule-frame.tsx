import { useTranslation } from 'react-i18next';

import { Button, Input } from '@/common/components';

import { useCreateScheduleForm } from '../../viewmodels';

export function CreateScheduleFrame() {
  const { t } = useTranslation('admin');
  const {} = useCreateScheduleForm();

  return (
    <div className="p-4">
      <form className="flex flex-col gap-4">
        <div>
          {t('schedule.create.title.label')}:
          <Input placeholder={t('schedule.create.title.placeholder')} />
        </div>
        <div>
          {t('schedule.create.applicationStartTime.label')}:
          <Input type="datetime-local" />
        </div>
        <div>
          {t('schedule.create.excel.label')}
          <Input type="file" />
        </div>
        <div>
          <div>{t('schedule.create.summary.label')}</div>
          <ul className="list-disc pl-4">
            <li>{t('schedule.create.summary.semester')}: 2025</li>
          </ul>
        </div>
        <Button>{t('schedule.create.action')}</Button>
      </form>
    </div>
  );
}
