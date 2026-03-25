import { useQueryClient } from '@tanstack/react-query';

import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';

export const useBulkUpdateRepair = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation('admin');

  return $api.useMutation('patch', ApiPaths.ScheduleController_bulkUpdateRepair, {
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['get', ApiPaths.ScheduleController_findAllInspectionTargetInfos],
      });
    },
    onError: (error) => {
      if (error.statusCode === 400) {
        toast.error(t('error.badRequest', { ns: 'common' }));
      } else if (error.statusCode === 401) {
        toast.error(t('error.unauthorized', { ns: 'common' }));
      } else if (error.statusCode === 403) {
        toast.error(t('target.error.repairLockedByStatus'));
      } else {
        toast.error(t('error.internalServerError', { ns: 'common' }));
      }
    },
  });
};
