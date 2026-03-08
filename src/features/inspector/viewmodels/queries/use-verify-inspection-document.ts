import { useQueryClient } from '@tanstack/react-query';

import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';

export const useVerifyInspectionDocument = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation('inspector');

  return $api.useMutation('patch', ApiPaths.MoveOutController_verifyInspectionDocument, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get', ApiPaths.InspectorController_getMyInspectionTargets],
      });
    },
    onError: (error) => {
      if (error.statusCode === 400) {
        toast.error(t('error.badRequest', { ns: 'common' }));
      } else if (error.statusCode === 404) {
        toast.error(t('error.notFound'));
      } else {
        toast.error(t('error.internalServerError', { ns: 'common' }));
      }
    },
  });
};
