import { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

import { $api } from '@/common/lib';

import { ApiPaths, type ArticleType } from '../../models';

const LIMIT = 20;

export function useFindArticles({ type }: { type: ArticleType }) {
  const { t } = useTranslation('user');

  const { data, error, isError, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    $api.useInfiniteQuery(
      'get',
      ApiPaths.ArticleController_findArticles,
      {
        params: {
          query: { type, limit: LIMIT, offset: 0 },
        },
      },
      {
        pageParamName: 'offset',
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
          const loaded = allPages.flatMap((p) => p.articles).length;
          return loaded < lastPage.totalCount ? loaded : undefined;
        },
      },
    );

  useEffect(() => {
    if (!isError) return;
    if (error?.statusCode === 401) {
      toast.error(t('error.unauthorized', { ns: 'common' }));
    } else if (error?.statusCode === 500) {
      toast.error(t('error.internalServerError', { ns: 'common' }));
    }
  }, [error, isError, t]);

  const articles = [...(data?.pages.flatMap((p) => p.articles) ?? [])].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );

  return {
    articles,
    totalCount: data?.pages[0]?.totalCount ?? 0,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
