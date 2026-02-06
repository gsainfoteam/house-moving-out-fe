import { useParams } from '@tanstack/react-router';

import { groupBy } from 'es-toolkit/array';
import { useTranslation } from 'react-i18next';

import { Loading } from '@/common/components';
import { cn } from '@/common/utils';

import { useTargets } from '../../viewmodels';

// NOTE: https://ziggle.gistory.me/ko/notice/197993

const threeRooms = [
  'G301',
  'G302',
  'G401',
  'G402',
  'G413',
  'G414',
  'G501',
  'G502',
  'G513',
  'G514',
  'G601',
  'G602',
  'G613',
  'G614',
  'I318',
  'I319',
  'I406',
  'I407',
  'I418',
  'I419',
  'I506',
  'I507',
  'I518',
  'I519',
  'I606',
  'I607',
  'I618',
  'I619',
];

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
            <th className="[&&]:border-r-2">{t('target.detail.roomNumber')}</th>
            <th>{t('target.detail.admissionYear')}</th>
            <th>{t('target.detail.name')}</th>
            <th>{t('target.detail.admissionYear')}</th>
            <th>{t('target.detail.name')}</th>
            <th>{t('target.detail.admissionYear')}</th>
            <th>{t('target.detail.name')}</th>
            <th>{t('target.detail.type')}</th>
            <th>{t('target.detail.lastInspection')}</th>
            <th>{t('target.detail.inspectionCount')}</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(groupBy(targets, (target) => target.roomNumber)).map(
            ([roomNumber, ts]) => (
              <tr key={roomNumber}>
                <td
                  className={cn(
                    '[&&]:border-r-2',
                    threeRooms.includes(roomNumber) && 'bg-yellow-200',
                  )}
                >
                  {roomNumber}
                </td>
                <td className={cn(ts[0]?.admissionYear.search(/^[0-9]+$/) === -1 && 'bg-red-200')}>
                  {ts[0]?.admissionYear}
                </td>
                <td>{ts[0]?.studentName}</td>
                <td className={cn(ts[1]?.admissionYear.search(/^[0-9]+$/) === -1 && 'bg-red-200')}>
                  {ts[1]?.admissionYear}
                </td>
                <td>{ts[1]?.studentName}</td>
                <td className={cn(ts[2]?.admissionYear.search(/^[0-9]+$/) === -1 && 'bg-red-200')}>
                  {ts[2]?.admissionYear}
                </td>
                <td>{ts[2]?.studentName}</td>
                <td>
                  {(threeRooms.includes(roomNumber) ? ts.length === 3 : ts.length === 2)
                    ? t('type.all')
                    : t('type.individual')}
                </td>
                <td>-</td>
                <td>0</td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </main>
  );
}
