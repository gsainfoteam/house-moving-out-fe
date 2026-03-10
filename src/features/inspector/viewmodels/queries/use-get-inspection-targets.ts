import { useEffect, useMemo } from 'react';

import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';

export const useGetInspectionTargets = () => {
  const { data, error, isError, isLoading } = $api.useQuery(
    'get',
    ApiPaths.InspectorController_getMyAssignedTargets,
    {},
    {
      retry(count, error) {
        if (error.statusCode === 404 || error.statusCode === 400 || error.statusCode === 403)
          return false;
        return count < 3;
      },
    },
  );

  const { t } = useTranslation('inspector');

  useEffect(() => {
    if (!isError) return;
    if (error.statusCode === 401) {
      toast.error(t('error.unauthorized', { ns: 'common' }));
    } else if (error.statusCode === 403) {
      toast.error(t('error.notInspector'));
    } else if (error.statusCode === 404) {
      // view에서 처리
    } else {
      toast.error(t('error.internalServerError', { ns: 'common' }));
    }
  }, [error, isError, t]);

  const isNotFound = useMemo(() => error?.statusCode === 404, [error?.statusCode]);

  return {
    targets: data?.targets,
    isLoading,
    isNotFound,
  };
};
