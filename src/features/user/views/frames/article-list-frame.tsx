import { useState } from 'react';

import { Link } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import { LayoutCard, Pagination } from '@/common/components';

import { ArticleType, useFindArticles } from '../../viewmodels';
import { ArticleCard, ArticleTypeSegment } from '../components';

const PAGE_SIZE = 5;

export function ArticleListFrame() {
  const { t } = useTranslation('user');
  const [type, setType] = useState<ArticleType>(ArticleType.NOTICE);
  const [page, setPage] = useState(1);

  const offset = (page - 1) * PAGE_SIZE;

  const { articles, totalCount, isLoading } = useFindArticles({
    type,
    offset,
    limit: PAGE_SIZE,
  });

  return (
    <div className="flex h-full flex-col gap-4">
      <ArticleTypeSegment
        value={type}
        onChange={(nextType) => {
          setType(nextType);
          setPage(1);
        }}
      />
      <LayoutCard.Root isLoading={isLoading}>
        <LayoutCard.Header className="gap-4">
          <LayoutCard.Text>
            <LayoutCard.Title>{t('list.title')}</LayoutCard.Title>
          </LayoutCard.Text>
        </LayoutCard.Header>
        <LayoutCard.Body className="gap-3">
          {articles.map((article) => (
            <Link
              key={article.uuid}
              to="/articles/$uuid"
              params={{ uuid: article.uuid }}
              className="w-full"
            >
              <ArticleCard article={article} />
            </Link>
          ))}
        </LayoutCard.Body>
        {totalCount > PAGE_SIZE && (
          <LayoutCard.Footer>
            <Pagination
              page={page}
              pageSize={PAGE_SIZE}
              totalCount={totalCount}
              onChange={setPage}
            />
          </LayoutCard.Footer>
        )}
      </LayoutCard.Root>
    </div>
  );
}
