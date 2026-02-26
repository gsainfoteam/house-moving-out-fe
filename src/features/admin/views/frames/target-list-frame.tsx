import React from 'react';

import { useParams } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import { Loading } from '@/common/components';
import { cn } from '@/common/utils';

import { InspectionType } from '../../models';
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
          {targets.map((target) => (
            <tr key={target.roomNumber}>
              <td
                className={cn(
                  '[&&]:border-r-2',
                  threeRooms.includes(target.roomNumber) && 'bg-yellow-200',
                )}
              >
                {target.roomNumber}
              </td>
              {[...target.residents, null, null].slice(0, 3).map((s, index) =>
                s ? (
                  <React.Fragment key={index}>
                    <td className={cn(s.admissionYear.search(/^[0-9]+$/) === -1 && 'bg-red-200')}>
                      {s.admissionYear}
                    </td>
                    <td>{s.name}</td>
                  </React.Fragment>
                ) : (
                  <td colSpan={2} key={index} />
                ),
              )}
              <td>
                {target.inspectionType === InspectionType.EMPTY
                  ? ''
                  : target.inspectionType === InspectionType.FULL
                    ? t('type.all')
                    : t('type.individual')}
              </td>
              <td>-</td>
              <td>0</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
