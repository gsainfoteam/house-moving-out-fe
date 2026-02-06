import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

export function ApplicationListFrame() {
  const { t } = useTranslation('admin');
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
          {[...Array(10)]
            .map(() => ({
              id: crypto.randomUUID(),
              roomNumber: 'G310',
              studentNumber: '20250000',
              name: '홍길동',
              phoneNumber: '+82 10-0000-0000',
              appliedAt: new Date().toString(),
              inspectedAt: new Date().toString(),
              type: 'first' as 'first' | 'second',
              inspector: '홍길동',
              result: 'passed' as 'passed' | 'failed',
            }))
            .map((a) => (
              <tr key={a.id}>
                <td>{a.id.slice(-4)}</td>
                <td>{a.roomNumber}</td>
                <td>{a.studentNumber}</td>
                <td>{a.name}</td>
                <td>{a.phoneNumber}</td>
                <td>{dayjs(a.appliedAt).format('MM-DD HH:mm')}</td>
                <td>{dayjs(a.appliedAt).format('ddd HH:mm')}</td>
                {/* t('inspectionType.first') */}
                {/* t('inspectionType.second') */}
                <td>{t(`inspectionType.${a.type}`)}</td>
                <td>{a.inspector}</td>
                {/* t('result.passed') */}
                {/* t('result.failed') */}
                <td>{t(`result.${a.result}`)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </main>
  );
}
