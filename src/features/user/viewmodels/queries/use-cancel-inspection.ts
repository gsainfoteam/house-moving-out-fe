import { useQueryClient } from '@tanstack/react-query';

import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';

export const useCancelInspection = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation('user');

  return $api.useMutation('delete', ApiPaths.ApplicationController_cancelInspection, {
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: ['get', ApiPaths.MoveOutController_findMyInspection],
      });
      queryClient.invalidateQueries({
        queryKey: ['get', ApiPaths.MoveOutController_findActiveMoveOutScheduleWithSlots],
      });
    },
    onError: (error) => {
      if (error?.statusCode === 401) {
        toast.error(t('error.unauthorized', { ns: 'common' }));
      } else if (error?.statusCode === 403) {
        toast.error(t('application.error.ownerCanCancel'));
      } else if (error?.statusCode === 404) {
        toast.error(t('application.error.invalidUuid'));
      } else {
        toast.error(t('error.internalServerError', { ns: 'common' }));
      }
    },
  });
};
