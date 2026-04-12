import { useCallback, useTransition } from 'react';

import { $typst } from '@myriaddreamin/typst.ts';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { api } from '@/common/lib';

import { ApiPaths, insertSignatureContent } from '../models';
import { useGetMoveOutScheduleQuery } from './queries';
import { saveFile } from '../utils';

import '@/common/lib/typst-init';

export const useDownloadDocuments = (scheduleUuid: string) => {
  const [isDownloading, startTransition] = useTransition();
  const { data } = useGetMoveOutScheduleQuery(scheduleUuid);
  const { t } = useTranslation('admin');

  const download = useCallback(
    (blob: Blob) =>
      startTransition(async () => {
        if (!data) return;
        const response = await api
          .GET(ApiPaths.ScheduleController_downloadInspectionDocuments, {
            params: { path: { uuid: scheduleUuid } },
            parseAs: 'arrayBuffer',
          })
          .catch(() => null);
        if (!response?.data) {
          toast.error(t('error.internalServerError', { ns: 'common' }));
          return;
        }
        const array = new Uint8Array(response.data);
        await $typst.mapShadow('/assets/signature.png', await blob.bytes());
        const stringPages = response.response.headers.get('X-Total-Pages');
        if (!stringPages) {
          toast.warning(t('application.downloadDocuments.failToGenerate'));
          return saveFile(new Blob([array]), `${data.title}.pdf`);
        }
        const pages = Number.parseInt(stringPages);
        const result = await $typst.pdf({
          mainContent: insertSignatureContent,
          inputs: {
            pdfData: `"${array.toBase64()}"`,
            pdfPages: `${pages}`,
          },
        });
        if (!result) {
          toast.warning(t('application.downloadDocuments.failToGenerate'));
          return saveFile(new Blob([array]), `${data.title}.pdf`);
        }
        saveFile(new Blob([new Uint8Array(result)]), `${data.title}.pdf`);
      }),
    [data, scheduleUuid, t],
  );

  return { download, isDownloading };
};
