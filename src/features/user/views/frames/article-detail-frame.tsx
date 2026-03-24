import { useMemo } from 'react';

import { useParams } from '@tanstack/react-router';

import dayjs from 'dayjs';

import { useLocale } from '@/common/lib';

import { useFindArticleByUuid } from '../../viewmodels';

import { ArticleDetailView } from '../views';

export function ArticleDetailFrame() {
  const { uuid } = useParams({ from: '/_auth-required/_user/articles/$uuid' });

  const { article, isLoading, isNotFound } = useFindArticleByUuid(uuid);

  const locale = useLocale();
  const title = useMemo(() => {
    return locale === 'ko' ? article?.titleKo : article?.titleEn;
  }, [article, locale]);
  const content = useMemo(() => {
    return locale === 'ko' ? article?.contentKo : article?.contentEn;
  }, [article, locale]);

  // impossible case
  if (isNotFound || !article) return null;

  return (
    <ArticleDetailView
      title={title}
      content={content}
      updatedAt={dayjs(article.updatedAt).format('YYYY-MM-DD HH:mm')}
      isLoading={isLoading}
    />
  );
}
