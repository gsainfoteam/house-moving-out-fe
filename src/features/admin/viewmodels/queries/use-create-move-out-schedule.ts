import { useQueryClient } from '@tanstack/react-query';

import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { $api } from '@/common/lib';
import { multipartSerializer } from '@/common/utils';

import { ApiPaths } from '../../models';

export const useCreateMoveOutSchedule = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation('admin');

  return $api.useMutation('post', ApiPaths.MoveOutController_createMoveOutScheduleWithTargets, {
    onMutate(variables) {
      variables.bodySerializer = multipartSerializer(false);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get', ApiPaths.MoveOutController_findAllMoveOutSchedules],
      });
    },
    onError: (error) => {
      if (error.statusCode === 400) {
        toast.error(t('error.badRequest', { ns: 'common' }));
      } else if (error.statusCode === 401) {
        toast.error(t('error.unauthorized', { ns: 'common' }));
      } else {
        toast.error(t('error.internalServerError', { ns: 'common' }));
      }
    },
  });
};
