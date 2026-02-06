import { useParams } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import { Loading } from '@/common/components';

import { useTargets } from '../../viewmodels';

export function TargetListFrame() {
  const { uuid } = useParams({ from: '/admin/schedules/$uuid/targets' });
  const { data: targets, error } = useTargets(uuid);
  const { t } = useTranslation('admin');

  if (error) return <div>{t('target.error.load')}</div>;
  if (!targets) return <Loading containerClassName="h-auto flex-1" />;
  return (
    <main className="p-4">
      <table className="text-center [&_td,&_th]:border [&_td,&_th]:px-2">
        <thead>
          <tr>
            <th>{t('target.detail.roomNumber')}</th>
            <th>{t('target.detail.name')}</th>
            <th>{t('target.detail.admissionYear')}</th>
          </tr>
        </thead>
        <tbody>
          {targets.map((target) => (
            <tr key={target.uuid}>
              <td>{target.roomNumber}</td>
              <td>{target.studentName}</td>
              <td>{target.admissionYear}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
