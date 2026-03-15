import { Link } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import { LayoutCard } from '@/common/components';

import { ArticleType } from '../../models';
import { useFindArticles } from '../../viewmodels';
import { ArticleCard } from '../components';

export function ArticleListFrame() {
  const { t } = useTranslation('user');
  // TODO: 타입 선택 기능 추가 - layout card 위에 segment control 추가
  const { articles, isLoading } = useFindArticles({ type: ArticleType.NOTICE });

  return (
    <LayoutCard.Root isLoading={isLoading}>
      <LayoutCard.Header>
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
  );
}
