import { useQueryClient } from '@tanstack/react-query';

import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';

export const useDeleteInspector = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation('admin');
  return $api.useMutation('delete', ApiPaths.InspectorController_deleteInspector, {
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['get', ApiPaths.MoveOutController_findInspectorsByScheduleUuid],
      }),
    onError: (error) => {
      if (error.statusCode === 401) {
        toast.error(t('error.unauthorized', { ns: 'common' }));
      } else if (error?.statusCode === 404) {
        toast.error(t('inspectors.error.notFound'));
      } else {
        toast.error(t('error.internalServerError', { ns: 'common' }));
      }
    },
  });
};
