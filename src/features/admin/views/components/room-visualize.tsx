import React from 'react';

import { range } from 'es-toolkit';
import { useTranslation } from 'react-i18next';

import { cn } from '@/common/utils';

const config = {
  G: [19, 19, 19, 19, 19, 19],
  I: [19, 19, 19, 19, 19, 19],
  S: [0, 18, 18, 18, 17, 17],
  T: [22, 22, 22, 21, 21, 21],
};

const disabledRooms = ['G101', 'G201', 'I119', 'I201', 'I102', 'I103'];

export function RoomVisualize() {
  const { t } = useTranslation('admin');
  return (
    <table className="text-center [&_td,&_th]:border [&_td,&_th]:px-2">
      {Object.entries(config).map(([house, counts], index) => (
        <tbody key={house}>
          {range(1, Math.max(...counts) + 1).map((index) => (
            <tr key={index}>
              {range(1, 7).map((floor) => {
                if (counts[floor - 1] < index)
                  return (
                    <React.Fragment key={floor}>
                      <th />
                      <td />
                    </React.Fragment>
                  );
                const roomNumber = `${house}${floor}${index.toString().padStart(2, '0')}`;
                const status = disabledRooms.includes(roomNumber)
                  ? 'disabled'
                  : (
                      [
                        'passed',
                        'failed',
                        'not_inspected',
                        'will_be_cleaned',
                        'single',
                        'single_passed',
                      ] as const
                    )[Math.floor(Math.random() * 10)];
                return (
                  <React.Fragment key={floor}>
                    <th>{roomNumber}</th>
                    <td
                      className={cn(
                        status === 'disabled' && 'bg-gray-400',
                        status === 'passed' && 'bg-green-200',
                        status === 'failed' && 'bg-red-200',
                        status === 'not_inspected' && 'bg-red-200',
                        status === 'will_be_cleaned' && 'bg-purple-600',
                        status === 'single' && 'bg-red-200',
                        status === 'single_passed' && 'bg-yellow-200',
                      )}
                    >
                      {/* t('status.passed') */}
                      {/* t('status.disabled') */}
                      {/* t('status.failed') */}
                      {/* t('status.not_inspected') */}
                      {/* t('status.will_be_cleaned') */}
                      {/* t('status.single') */}
                      {/* t('status.single_passed') */}
                      {status && t(`status.${status}`)}
                    </td>
                  </React.Fragment>
                );
              })}
            </tr>
          ))}
          {index !== Object.entries(config).length - 1 && (
            <tr>
              <td colSpan={14} className="h-2 [&&]:border-none" />
            </tr>
          )}
        </tbody>
      ))}
    </table>
  );
}
