import { useParams } from '@tanstack/react-router';

import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import { Loading } from '@/common/components';

import { useApplications } from '../../viewmodels';

export function ApplicationListFrame() {
  const { uuid } = useParams({ from: '/admin/schedules/$uuid/applications' });
  const { data, error } = useApplications(uuid);
  const { t } = useTranslation('admin');

  if (error) return <div>{t('application.error.load')}</div>;
  if (!data) return <Loading containerClassName="h-full" />;

  return (
    <main className="p-4">
      <table className="text-center [&_td,&_th]:border [&_td,&_th]:px-2">
        <thead>
          <tr>
            <th>{t('application.detail.id')}</th>
            <th>{t('application.detail.roomNumber')}</th>
            <th>{t('application.detail.studentNumber')}</th>
            <th>{t('application.detail.name')}</th>
            <th>{t('application.detail.phoneNumber')}</th>
            <th>{t('application.detail.appliedAt')}</th>
            <th>{t('application.detail.inspectedAt')}</th>
            <th>{t('application.detail.type')}</th>
            <th>{t('application.detail.inspector')}</th>
            <th>{t('application.detail.result')}</th>
          </tr>
        </thead>
        <tbody>
          {data.detailedApplications.map((a) => (
            <tr key={a.uuid}>
              <td>{a.uuid.slice(-4)}</td>
              <td>{a.roomNumber}</td>
              <td>{a.phoneNumber}</td>
              <td>{a.phoneNumber}</td>
              <td>{a.phoneNumber}</td>
              <td>{dayjs(a.applicationTime).format('MM-DD HH:mm')}</td>
              <td>{dayjs(a.inspectionTime).format('ddd HH:mm')}</td>
              {/* t('inspectionType.first') */}
              {/* t('inspectionType.second') */}
              <td>{t(`inspectionType.${'first'}`)}</td>
              <td>{a.inspectorName}</td>
              <td>
                {a.isPassed === null ? '-' : a.isPassed ? t(`result.passed`) : t(`result.failed`)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
