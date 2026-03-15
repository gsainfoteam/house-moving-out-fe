import { useEffect, useMemo } from 'react';

import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { $api } from '@/common/lib';

import { ApiPaths } from '../../models';

export function useFindArticleByUuid(uuid: string) {
  const { t } = useTranslation('user');
  const { data, error, isError, isLoading } = $api.useQuery(
    'get',
    ApiPaths.ArticleController_findArticleByUuid,
    { params: { path: { uuid } } },
    {
      retry(count, queryError) {
        if (queryError?.statusCode === 404 || queryError?.statusCode === 400) return false;
        return count < 3;
      },
    },
  );

  useEffect(() => {
    if (!isError) return;
    if (error?.statusCode === 401) {
      toast.error(t('error.unauthorized', { ns: 'common' }));
    } else if (error?.statusCode === 403) {
      toast.error(t('error.forbidden', { ns: 'common' }));
    } else if (error?.statusCode === 404) {
      toast.error(t('error.notFound', { ns: 'common' }));
    } else if (error?.statusCode === 500) {
      toast.error(t('error.internalServerError', { ns: 'common' }));
    }
  }, [error, isError, t]);

  const isNotFound = useMemo(() => error?.statusCode === 404, [error?.statusCode]);

  return {
    article: data,
    isLoading,
    isNotFound,
  };
}
