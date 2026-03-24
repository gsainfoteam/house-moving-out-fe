import { useQueryClient } from '@tanstack/react-query';

import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { $api } from '@/common/lib';

import { ApiPaths, type ScheduleStatus } from '../../models';

export const useChangeScheduleStatus = (uuid: string) => {
  const { t } = useTranslation('admin');
  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = $api.useMutation(
    'patch',
    ApiPaths.ScheduleController_updateStatus,
    {
      onSuccess: async () => {
        await Promise.all([
          queryClient.invalidateQueries({
            queryKey: ['get', ApiPaths.ScheduleController_findMoveOutScheduleWithSlots],
          }),
          queryClient.invalidateQueries({
            queryKey: ['get', ApiPaths.ScheduleController_findAllMoveOutSchedules],
          }),
        ]);
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
    },
  );

  const changeScheduleStatus = (status: ScheduleStatus) =>
    mutateAsync({ params: { path: { uuid } }, body: { status } });

  return {
    isPending,
    changeScheduleStatus,
  };
};
