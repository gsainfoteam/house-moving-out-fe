import { useQueryClient } from '@tanstack/react-query';

import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';

export const useCreateTemporaryInspector = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation('admin');
  return $api.useMutation('post', ApiPaths.InspectorController_createTemporaryInspectors, {
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['get', ApiPaths.InspectorController_getInspectors],
        }),
        queryClient.invalidateQueries({
          queryKey: ['get', ApiPaths.ScheduleController_findInspectorsByScheduleUuid],
        }),
      ]),
    onError: (error) => {
      if (error.statusCode === 401) {
        toast.error(t('error.unauthorized', { ns: 'common' }));
      } else {
        toast.error(t('error.internalServerError', { ns: 'common' }));
      }
    },
  });
};
