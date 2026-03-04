import { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';

export const useGetInspectors = (enabled = true) => {
  const { t } = useTranslation('auth');
  const { data, error, isError, isLoading } = $api.useQuery(
    'get',
    ApiPaths.InspectorController_getInspectors,
    {},
    {
      retry(count, error) {
        if (error?.statusCode === 401) return false;
        return count < 3;
      },
      enabled,
    },
  );

  useEffect(() => {
    if (!isError) return;
    if (error.statusCode === 401) {
      toast.error(t('error.unauthorized', { ns: 'common' }));
    } else {
      toast.error(t('error.internalServerError', { ns: 'common' }));
    }
  }, [error, isError, t]);

  return {
    data,
    isLoading,
  };
};
