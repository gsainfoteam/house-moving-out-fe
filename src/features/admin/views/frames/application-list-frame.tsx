import { useState } from 'react';

import { useParams } from '@tanstack/react-router';

import dayjs from 'dayjs';
import { Download, InfoIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button, Dialog, Loading, Pagination } from '@/common/components';
import { overlay } from '@/common/lib';

import { useApplications, useDownloadDocuments } from '../../viewmodels';

const PAGE_SIZE = 20;

export function ApplicationListFrame() {
  const { uuid } = useParams({ from: '/_auth-required/admin/schedules/$uuid/applications' });
  const [page, setPage] = useState(1);
  const { data, error } = useApplications(uuid, page, PAGE_SIZE);
  const { download, isDownloading } = useDownloadDocuments(uuid);
  const { t } = useTranslation('admin');

  if (error) return <div>{t('application.error.load')}</div>;
  if (!data) return <Loading containerClassName="h-full" />;

  return (
    <main className="flex flex-col gap-4 p-4">
      <div className="flex justify-end">
        <Button onClick={download} disabled={isDownloading}>
          {t('application.downloadDocuments')}
        </Button>
      </div>
      <div className="bg-bg-white overflow-hidden rounded-xl border border-gray-200 shadow-sm">
        <table className="w-full text-center [&_td,&_th]:border [&_td,&_th]:border-gray-200 [&_td,&_th]:px-3 [&_td,&_th]:py-2">
          <thead>
            <tr className="bg-bg-surface/80 [&_th]:text-text-black [&_th]:font-medium">
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
              <th>{t('application.detail.note')}</th>
              <th>{t('application.detail.document')}</th>
            </tr>
          </thead>
          <tbody>
            {data.applications.map((a) => (
              <tr key={a.uuid}>
                <td>{a.uuid.slice(-4)}</td>
                <td>{a.targetInfo.roomNumber}</td>
                <td>{a.user.studentNumber}</td>
                <td>{a.user.name}</td>
                <td>{a.user.phoneNumber}</td>
                <td>{dayjs(a.createdAt).format('MM-DD HH:mm')}</td>
                <td>{dayjs(a.inspectionSlot.startTime).format('ddd HH:mm')}</td>
                <td>{t(`inspectionType.${a.inspectionCount === 1 ? 'first' : 'second'}`)}</td>
                <td>{a.inspector.name}</td>
                <td>
                  {a.isPassed === null ? '-' : a.isPassed ? t(`result.passed`) : t(`result.failed`)}
                </td>
                <td>
                  {a.additionalComment && (
                    <Button
                      className="mx-auto"
                      size="icon"
                      variant="outline"
                      aria-label={t('application.detail.openNote')}
                      onClick={() =>
                        overlay.open(() => (
                          <Dialog.Root>
                            <Dialog.Header>
                              <Dialog.Title>
                                {t('application.detail.note')} - {a.targetInfo.roomNumber}
                              </Dialog.Title>
                              <Dialog.Description>{a.additionalComment}</Dialog.Description>
                            </Dialog.Header>
                            <Dialog.Footer>
                              <Dialog.Close asChild>
                                <Button className="w-full">
                                  {t('application.detail.closeNote')}
                                </Button>
                              </Dialog.Close>
                            </Dialog.Footer>
                          </Dialog.Root>
                        ))
                      }
                    >
                      <InfoIcon aria-hidden />
                    </Button>
                  )}
                </td>
                <td>
                  {a.document ? (
                    <Button asChild variant="outline" size="icon" className="mx-auto">
                      <a
                        href={a.document}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={t('application.detail.downloadPdf')}
                      >
                        <Download size={16} aria-hidden="true" />
                      </a>
                    </Button>
                  ) : (
                    '-'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {data.totalCount > PAGE_SIZE && (
          <div className="p-2">
            <Pagination
              page={page}
              pageSize={PAGE_SIZE}
              totalCount={data.totalCount}
              onChange={setPage}
            />
          </div>
        )}
      </div>
    </main>
  );
}
