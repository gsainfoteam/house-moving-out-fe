import { useMemo } from 'react';

import { Link, useParams } from '@tanstack/react-router';

import { IconChevronLeft } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import { LayoutCard } from '@/common/components';
import { useLocale } from '@/common/lib';

import { useFindArticleByUuid } from '../../viewmodels';

export function ArticleDetailFrame() {
  const { uuid } = useParams({ from: '/_auth-required/_user/articles/$uuid' });
  const { t } = useTranslation('user');

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
    <LayoutCard.Root isLoading={isLoading}>
      <LayoutCard.Header>
        <Link to="/articles" className="text-sub2 text-text-gray inline-flex items-center gap-1">
          <IconChevronLeft className="text-icon-gray size-4" />
          <span>{t('detail.back')}</span>
        </Link>
        <LayoutCard.Text>
          <LayoutCard.Title>{title}</LayoutCard.Title>
          <LayoutCard.Description>
            {dayjs(article.updatedAt).format('YYYY-MM-DD HH:mm')}
          </LayoutCard.Description>
        </LayoutCard.Text>
      </LayoutCard.Header>
      <LayoutCard.Body className="text-text-black items-start gap-3">{content}</LayoutCard.Body>
    </LayoutCard.Root>
  );
}
