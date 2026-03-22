import { useCallback, useTransition } from 'react';

import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { api } from '@/common/lib';

import { ApiPaths } from '../models';
import { useGetMoveOutScheduleQuery } from './queries';

export const useDownloadDocuments = (scheduleUuid: string) => {
  const [isDownloading, startTransition] = useTransition();
  const { data } = useGetMoveOutScheduleQuery(scheduleUuid);
  const { t } = useTranslation('admin');

  const download = useCallback(
    () =>
      startTransition(async () => {
        if (!data) return;
        try {
          const response = await api.GET(ApiPaths.ScheduleController_downloadInspectionDocuments, {
            params: { path: { uuid: scheduleUuid } },
            parseAs: 'blob',
          });
          if (!response.data) return;
          const url = URL.createObjectURL(response.data);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${data.title}.pdf`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        } catch {
          toast.error(t('error.internalServerError', { ns: 'common' }));
        }
      }),
    [data, scheduleUuid, t],
  );

  return { download, isDownloading };
};
