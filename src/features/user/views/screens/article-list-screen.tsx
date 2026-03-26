import { Fragment, useEffect, useRef } from 'react';

import { Link } from '@tanstack/react-router';

import { BookOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { LayoutCard, useList } from '@/common/components';
import type { Article } from '@/features/user';

import { ArticleType } from '../../viewmodels';
import { ArticleCard } from '../components';

export function ArticleListScreen({
  type,
  onTypeChange,
  articles,
  totalCount,
  isLoading,
  hasMore,
  isFetchingMore,
  onLoadMore,
}: ArticleListScreen.Props) {
  const { t } = useTranslation('user');
  const list = useList(articles);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !onLoadMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !isFetchingMore) {
          onLoadMore();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, isFetchingMore, onLoadMore]);

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
                {i > 0 && <span className="text-heading text-text-muted select-none">/</span>}
                <button
                  type="button"
                  onClick={() => onTypeChange(tab.type)}
                  className={
                    tab.type === type
                      ? 'text-heading text-text-primary font-semibold'
                      : 'text-heading text-text-muted hover:text-text-secondary transition-colors'
                  }
                >
                  {tab.label}
                </button>
              </Fragment>
            ))}
          </div>
          <span className="text-label text-text-secondary bg-bg-surface rounded-full px-2.5 py-1">
            {totalCount.toLocaleString()}
          </span>
        </LayoutCard.Header>
        <LayoutCard.Body className="gap-3">
          <list.Root className="gap-3">
            <list.Empty
              icon={<BookOpen />}
              title={t('list.empty')}
              description={t('list.emptyDescription')}
            />
            <list.Builder className="flex w-full flex-col gap-3">
              {(article) => (
                <Link
                  key={article.uuid}
                  to="/articles/$uuid"
                  params={{ uuid: article.uuid }}
                  className="w-full"
                >
                  <ArticleCard article={article} />
                </Link>
              )}
            </list.Builder>
            {hasMore && <div ref={sentinelRef} className="h-1 w-full shrink-0" />}
          </list.Root>
        </LayoutCard.Body>
      </LayoutCard.Root>
    </div>
  );
}

export namespace ArticleListScreen {
  export type Props = {
    type: ArticleType;
    onTypeChange: (type: ArticleType) => void;
    articles: Article[];
    totalCount: number;
    isLoading: boolean;
    hasMore: boolean;
    isFetchingMore: boolean;
    onLoadMore: () => void;
  };
}
