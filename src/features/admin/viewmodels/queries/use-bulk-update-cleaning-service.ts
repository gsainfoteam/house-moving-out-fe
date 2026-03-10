import { useQueryClient } from '@tanstack/react-query';

import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';

export const useBulkUpdateCleaningService = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation('admin');

  return $api.useMutation('patch', ApiPaths.ScheduleController_bulkUpdateCleaningService, {
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['get', ApiPaths.MoveOutController_findAllInspectionTargetInfos],
      });
    },
    onError: (error) => {
      if (error.statusCode === 400) {
        toast.error(t('error.badRequest', { ns: 'common' }));
      } else if (error.statusCode === 401) {
        toast.error(t('error.unauthorized', { ns: 'common' }));
      } else if (error.statusCode === 403) {
        toast.error(t('target.error.cleaningLockedByStatus'));
      } else {
        toast.error(t('error.internalServerError', { ns: 'common' }));
      }
    },
  });
};
