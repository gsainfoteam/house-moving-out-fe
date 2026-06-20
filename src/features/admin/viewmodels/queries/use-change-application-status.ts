import { useQueryClient } from '@tanstack/react-query';

import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { $api } from '@/common/lib';

import { ApiPaths, type AdminApplicationStatus } from '../../models';

export const useChangeApplicationStatus = () => {
  const { t } = useTranslation('admin');
  const queryClient = useQueryClient();

  return $api.useMutation('patch', ApiPaths.ApplicationController_updateInspectionStatusByAdmin, {
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['get', ApiPaths.ScheduleController_findAllInspectionApplications],
      });
    },
    onError: (error) => {
      if (error.statusCode === 400) {
        toast.error(t('error.badRequest', { ns: 'common' }));
      } else if (error.statusCode === 401) {
        toast.error(t('error.unauthorized', { ns: 'common' }));
      } else if (error.statusCode === 403) {
        toast.error(t('application.detail.changeStatus.forbidden'));
      } else if (error.statusCode === 404) {
        toast.error(t('error.notFound', { ns: 'common' }));
      } else {
        toast.error(t('error.internalServerError', { ns: 'common' }));
      }
    },
  });
};

export type ChangeApplicationStatusBody = {
  status: AdminApplicationStatus | null;
  additionalComment: string;
};
