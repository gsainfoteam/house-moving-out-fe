import { useQueryClient } from '@tanstack/react-query';

import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';

export const useDeleteAdmin = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation('admin', { keyPrefix: 'admins' });
  const { t: tCommon } = useTranslation('common');
  return $api.useMutation('delete', ApiPaths.AdminController_deleteAdmin, {
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['get', ApiPaths.AdminController_listAdmins],
      }),
    onError: (error) => {
      if (error.statusCode === 401) {
        toast.error(tCommon('error.unauthorized'));
      } else if (error.statusCode === 409) {
        toast.error(t('error.conflict'));
      } else {
        toast.error(tCommon('error.internalServerError'));
      }
    },
  });
};
