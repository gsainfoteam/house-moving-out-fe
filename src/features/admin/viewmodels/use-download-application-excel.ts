import { useCallback, useTransition } from 'react';

import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { api } from '@/common/lib';

import { ApiPaths } from '../models';
import { saveFile } from '../utils';
import { useGetMoveOutScheduleQuery } from './queries';

export const useDownloadApplicationExcel = (scheduleUuid: string) => {
  const [isDownloading, startTransition] = useTransition();
  const { data } = useGetMoveOutScheduleQuery(scheduleUuid);
  const { t } = useTranslation('admin');

  const download = useCallback(async () => {
    startTransition(async () => {
      if (!data) return;
      const response = await api.GET(ApiPaths.ScheduleController_downloadInspectionApplications, {
        params: { path: { uuid: scheduleUuid } },
        parseAs: 'blob',
      });
      if (!response?.data) {
        toast.error(t('error.internalServerError', { ns: 'common' }));
        return;
      }
      saveFile(new Blob([response.data]), `${data.title}.xlsx`);
    });
  }, [data, scheduleUuid, t]);

  return {
    download,
    isDownloading,
  };
};
