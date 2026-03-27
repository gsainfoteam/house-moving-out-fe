import { useRouter } from '@tanstack/react-router';

import { IconChevronLeft } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

import { LayoutCard } from '@/common/components';

export function ArticleDetailScreen({
  title,
  content,
  updatedAt,
  isLoading,
}: ArticleDetailScreen.Props) {
  const { t } = useTranslation('user');
  const router = useRouter();

  return (
    <LayoutCard.Root isLoading={isLoading}>
      <LayoutCard.Header>
        <button
          type="button"
          className="text-body text-text-secondary inline-flex items-center gap-1"
          onClick={() => router.history.back()}
        >
          <IconChevronLeft className="text-icon size-4" />
          <span>{t('detail.back')}</span>
        </button>
        <LayoutCard.Text>
          <LayoutCard.Title>{title}</LayoutCard.Title>
          <LayoutCard.Description>{updatedAt}</LayoutCard.Description>
        </LayoutCard.Text>
      </LayoutCard.Header>
      <LayoutCard.Body className="text-text-primary items-start gap-3">{content}</LayoutCard.Body>
    </LayoutCard.Root>
  );
}

export namespace ArticleDetailScreen {
  export type Props = {
    title: string | undefined;
    content: string | undefined;
    updatedAt: string;
    isLoading: boolean;
  };
}
