import { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';

export const useFindAllMoveOutSchedules = () => {
  const { data, error, isLoading } = $api.useQuery(
    'get',
    ApiPaths.MoveOutController_findAllMoveOutSchedules,
  );
  const { t } = useTranslation('admin');

  useEffect(() => {
    if (!error) return;
    if (error.statusCode === 401) {
      toast.error(t('error.unauthorized', { ns: 'common' }));
    } else {
      toast.error(t('error.internalServerError', { ns: 'common' }));
    }
  }, [error, t]);

  return {
    data,
    isLoading,
  };
};
