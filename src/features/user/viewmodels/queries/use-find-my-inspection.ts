import { useEffect, useMemo } from 'react';

import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';

export const useFindMyInspection = ({
  onSuccess,
  onFailed,
}: {
  onSuccess: () => void;
  onFailed: () => void;
}) => {
  const { t } = useTranslation('user');
  const { data, error, isLoading, isSuccess, isError } = $api.useQuery(
    'get',
    ApiPaths.MoveOutController_findMyInspection,
    {},
    {
      retry(count, error) {
        if (error?.statusCode === 404 || error?.statusCode === 400) return false;
        return count < 3;
      },
    },
  );

  useEffect(() => {
    if (!error) return;
    if (error.statusCode === 401) {
      toast.error(t('error.unauthorized', { ns: 'common' }));
    } else if (error?.statusCode === 404) {
      // view에서 step=0으로 처리됨
    } else {
      toast.error(t('error.internalServerError', { ns: 'common' }));
    }
  }, [error, t, onFailed]);

  useEffect(() => {
    if (isError) {
      onFailed?.();
    } else if (isSuccess) {
      onSuccess?.();
    }
  }, [isError, isSuccess, onFailed, onSuccess]);

  const inspectionStartTime = useMemo(
    () => (data ? dayjs(data.inspectionSlot.startTime) : undefined),
    [data],
  );

  return {
    data,
    isLoading,
    inspectionStartTime,
  };
};
