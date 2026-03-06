import { useQueryClient } from '@tanstack/react-query';

import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';

export const useSubmitInspectionResult = () => {
  const { t } = useTranslation('inspector');
  const queryClient = useQueryClient();

  return $api.useMutation('patch', ApiPaths.MoveOutController_submitInspectionResult, {
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: ['get', ApiPaths.MoveOutController_findMyInspection],
      });
      queryClient.invalidateQueries({
        queryKey: ['get', ApiPaths.MoveOutController_findActiveMoveOutScheduleWithSlots],
      });
    },
    onError: (error) => {
      if (error.statusCode === 400) {
        toast.error(t('error.badRequest', { ns: 'common' }));
      } else if (error.statusCode === 401) {
        toast.error(t('error.unauthorized', { ns: 'common' }));
      } else if (error.statusCode === 403) {
        toast.error(t('error.forbidden'));
      } else if (error.statusCode === 404) {
        toast.error(t('error.notFound'));
      } else if (error.statusCode === 409) {
        toast.error(t('error.alreadyPassed'));
      } else {
        toast.error(t('error.internalServerError', { ns: 'common' }));
      }
    },
  });
};
