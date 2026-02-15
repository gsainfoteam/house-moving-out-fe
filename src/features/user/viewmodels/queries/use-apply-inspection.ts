import { useQueryClient } from '@tanstack/react-query';

import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { $api } from '@/common/lib';

import { ApiPaths, type ApplicationUuidDto } from '../../models';

export const useApplyInspection = ({
  onSuccess,
  onFull,
}: {
  onSuccess?: (data: ApplicationUuidDto) => void;
  onFull?: () => void;
} = {}) => {
  const { t } = useTranslation('user');
  const queryClient = useQueryClient();

  return $api.useMutation('post', ApiPaths.MoveOutController_applyInspection, {
    onSuccess: (data) => {
      queryClient.removeQueries({
        queryKey: ['get', ApiPaths.MoveOutController_findMyInspection],
      });
      queryClient.invalidateQueries({
        queryKey: ['get', ApiPaths.MoveOutController_findActiveMoveOutScheduleWithSlots],
      });
      onSuccess?.(data);
    },
    onError: (error) => {
      if (error?.statusCode === 400) {
        toast.error(t('error.badRequest', { ns: 'common' }));
      } else if (error?.statusCode == 401) {
        toast.error(t('error.unauthorized', { ns: 'common' }));
      } else if (error?.statusCode == 403) {
        toast.error(t('application.error.notStartedOrEnded'));
      } else if (error?.statusCode === 404) {
        toast.error(t('application.error.noAvailableInspector'));
      } else if (error?.statusCode === 409) {
        onFull?.();
      } else {
        toast.error(t('error.internalServerError', { ns: 'common' }));
      }
    },
  });
};
