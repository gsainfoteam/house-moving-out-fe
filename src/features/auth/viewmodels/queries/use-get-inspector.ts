import { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';

export const useGetInspector = (id: string, enabled?: boolean) => {
  const { t } = useTranslation('auth');
  const { data, error, isError, isLoading, refetch } = $api.useQuery(
    'get',
    ApiPaths.InspectorController_getInspector,
    { params: { path: { id } } },
    {
      retry(count, error) {
        if (error?.statusCode === 404 || error?.statusCode === 400) return false;
        return count < 3;
      },
      enabled,
    },
  );

  useEffect(() => {
    if (!isError) return;
    if (error.statusCode === 400) {
      toast.error(t('error.badRequest', { ns: 'common' }));
    } else if (error.statusCode === 401) {
      toast.error(t('error.unauthorized', { ns: 'common' }));
    } else if (error.statusCode === 404) {
      // view에서 처리
    } else {
      toast.error(t('error.internalServerError', { ns: 'common' }));
    }
  }, [error, isError, t]);

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};
