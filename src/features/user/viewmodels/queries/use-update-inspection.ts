import { useQueryClient } from '@tanstack/react-query';

import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { $api } from '@/common/lib';

import { ApiPaths, type ApplicationUuidDto } from '../../models';

export const useUpdateInspection = ({
  onModifyTimeRestricted,
  onFull,
  onSuccess,
}: {
  onModifyTimeRestricted?: () => void;
  onFull?: () => void;
  onSuccess?: (data: ApplicationUuidDto) => void;
} = {}) => {
  const { t } = useTranslation('user');
  const queryClient = useQueryClient();

  return $api.useMutation('patch', ApiPaths.MoveOutController_updateInspection, {
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
      } else if (error?.statusCode === 401) {
        toast.error(t('error.unauthorized', { ns: 'common' }));
      } else if (error?.statusCode === 403) {
        onModifyTimeRestricted?.();
      } else if (error?.statusCode === 404) {
        toast.error(t('application.error.invalidUuid'));
      } else if (error?.statusCode === 409) {
        onFull?.();
      } else {
        toast.error(t('error.internalServerError', { ns: 'common' }));
      }
    },
  });
};
