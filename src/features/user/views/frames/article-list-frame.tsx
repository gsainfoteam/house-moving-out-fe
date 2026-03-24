import { useState } from 'react';

import { ArticleType, useFindArticles } from '../../viewmodels';

import { ArticleListView } from './article-list-view';

const PAGE_SIZE = 5;

export function ArticleListFrame() {
  const [type, setType] = useState<ArticleType>(ArticleType.NOTICE);
  const [page, setPage] = useState(1);

  const offset = (page - 1) * PAGE_SIZE;

  const { articles, totalCount, isLoading } = useFindArticles({
    type,
    offset,
    limit: PAGE_SIZE,
  });

  return (
    <ArticleListView
      type={type}
      onTypeChange={(nextType) => {
        setType(nextType);
        setPage(1);
      }}
      articles={articles}
      totalCount={totalCount}
      page={page}
      onPageChange={setPage}
      isLoading={isLoading}
    />
  );
}
