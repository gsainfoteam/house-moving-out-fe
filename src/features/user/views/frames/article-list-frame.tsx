import { useState } from 'react';

import { ArticleType, useFindArticles } from '../../viewmodels';
import { ArticleListScreen } from '../screens';

export function ArticleListFrame() {
  const [type, setType] = useState<ArticleType>(ArticleType.NOTICE);

  const { articles, totalCount, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFindArticles({ type });

  return (
    <ArticleListScreen
      type={type}
      onTypeChange={(nextType) => setType(nextType)}
      articles={articles}
      totalCount={totalCount}
      isLoading={isLoading}
      hasMore={hasNextPage ?? false}
      isFetchingMore={isFetchingNextPage}
      onLoadMore={fetchNextPage}
    />
  );
}
