import { Fragment } from 'react';

import { Link } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import { LayoutCard, Pagination } from '@/common/components';
import type { Article } from '@/features/user';

import { ArticleType } from '../../viewmodels';
import { ArticleCard } from '../components';

const PAGE_SIZE = 5;

export function ArticleListView({
  type,
  onTypeChange,
  articles,
  totalCount,
  page,
  onPageChange,
  isLoading,
}: ArticleListView.Props) {
  const { t } = useTranslation('user');

  const tabs = [
    { type: ArticleType.NOTICE, label: t('list.segment.notice') },
    { type: ArticleType.FAQ, label: t('list.segment.faq') },
  ];

  return (
    <div className="flex h-full min-h-0 flex-col gap-5">
      <LayoutCard.Root isLoading={isLoading}>
        <LayoutCard.Header className="flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            {tabs.map((tab, i) => (
              <Fragment key={tab.type}>
                {i > 0 && (
                  <span className="text-heading text-text-muted select-none">/</span>
                )}
                <button
                  type="button"
                  onClick={() => onTypeChange(tab.type)}
                  className={
                    tab.type === type
                      ? 'text-heading font-semibold text-text-primary'
                      : 'text-heading text-text-muted hover:text-text-secondary transition-colors'
                  }
                >
                  {tab.label}
                </button>
              </Fragment>
            ))}
          </div>
          <span className="text-label text-text-secondary rounded-full bg-bg-surface px-2.5 py-1">
            {totalCount.toLocaleString()}
          </span>
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
              onChange={onPageChange}
            />
          </LayoutCard.Footer>
        )}
      </LayoutCard.Root>
    </div>
  );
}

export namespace ArticleListView {
  export type Props = {
    type: ArticleType;
    onTypeChange: (type: ArticleType) => void;
    articles: Article[];
    totalCount: number;
    page: number;
    onPageChange: (page: number) => void;
    isLoading: boolean;
  };
}
