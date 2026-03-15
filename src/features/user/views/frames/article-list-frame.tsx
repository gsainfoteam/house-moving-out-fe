import { useState } from 'react';

import { Link } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import { LayoutCard } from '@/common/components';

import { ArticleType } from '../../models';
import { useFindArticles } from '../../viewmodels';
import { ArticleCard, ArticleTypeSegment } from '../components';

export function ArticleListFrame() {
  const { t } = useTranslation('user');
  const [type, setType] = useState<ArticleType>(ArticleType.NOTICE);
  const { articles, isLoading } = useFindArticles({ type });

  return (
    <div className="flex h-full flex-col gap-4">
      <ArticleTypeSegment value={type} onChange={setType} />
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
      </LayoutCard.Root>
    </div>
  );
}
