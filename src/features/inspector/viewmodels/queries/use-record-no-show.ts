import { useQueryClient } from '@tanstack/react-query';

import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { $api } from '@/common/lib';

import { ApiPaths, type NoShowStatus } from '../../models';

export const useRecordNoShow = () => {
  const { t } = useTranslation('inspector');
  const queryClient = useQueryClient();

  const { mutateAsync, ...rest } = $api.useMutation(
    'patch',
    ApiPaths.ApplicationController_recordTargetNoShow,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['get', ApiPaths.InspectorController_getMyAssignedTargets],
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
    },
  );

  const recordNoShow = (uuid: string, status: NoShowStatus) =>
    mutateAsync({ params: { path: { uuid } }, body: { status } }).catch(() => {});

  return {
    recordNoShow,
    ...rest,
  };
};
