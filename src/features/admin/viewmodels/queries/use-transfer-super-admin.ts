import { useQueryClient } from '@tanstack/react-query';

import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';

export const useTransferSuperAdmin = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation('admin', { keyPrefix: 'admins' });
  const { t: tCommon } = useTranslation('common');
  return $api.useMutation('post', ApiPaths.AdminController_transferSuperAdmin, {
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['get', ApiPaths.AdminController_listAdmins],
        }),
        queryClient.invalidateQueries({
          queryKey: ['get', ApiPaths.UserController_getMe],
        }),
      ]),
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
