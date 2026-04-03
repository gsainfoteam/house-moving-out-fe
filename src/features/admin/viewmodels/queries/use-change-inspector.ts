import { useQueryClient } from '@tanstack/react-query';

import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';

export const useChangeInspector = () => {
  const { t } = useTranslation('admin');
  const queryClient = useQueryClient();
  return $api.useMutation('patch', ApiPaths.ApplicationController_changeAssignedInspector, {
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['get', ApiPaths.ScheduleController_findAllInspectionApplications],
        }),
      ]);
    },
    onError: (error) => {
      if (error.statusCode === 400) {
        toast.error(t('error.badRequest', { ns: 'common' }));
      } else if (error.statusCode === 401) {
        toast.error(t('error.unauthorized', { ns: 'common' }));
      } else if (error.statusCode === 403) {
        toast.error(t('error.forbidden', { ns: 'common' }));
      } else if (error.statusCode === 404) {
        toast.error(t('error.notFound', { ns: 'common' }));
      } else if (error.statusCode === 409) {
        toast.error(t('application.detail.changeInspector.full'));
      } else {
        toast.error(t('error.internalServerError', { ns: 'common' }));
      }
    },
  });
};
