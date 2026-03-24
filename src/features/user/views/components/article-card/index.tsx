import { useMemo } from 'react';

import { IconBellFilled, IconMessageFilled, IconChevronRight } from '@tabler/icons-react';
import dayjs from 'dayjs';

import { useLocale } from '@/common/lib';
import { cn } from '@/common/utils';
import { ArticleType, type Article } from '@/features/user';

export function ArticleCard({ article, className, ...props }: ArticleCard.Props) {
  const locale = useLocale();
  const title = useMemo(() => {
    return locale === 'ko' ? article.titleKo : article.titleEn;
  }, [article, locale]);

  return (
    <div
      className={cn(
        'bg-bg border-border hover:bg-bg-surface border transition-colors duration-200',
        'flex w-full items-center justify-between rounded-xl p-3.5',
        className,
      )}
      {...props}
    >
      <div className="flex min-w-0 flex-1 flex-col items-start gap-2">
        <div className="flex w-full min-w-0 items-center gap-2">
          {article.type === ArticleType.NOTICE ? (
            <IconBellFilled className="text-primary shrink-0" />
          ) : (
            <IconMessageFilled className="text-icon shrink-0" />
          )}
          <div className="text-body-lg text-text-primary min-w-0 truncate font-semibold">
            {title}
          </div>
        </div>
        <p className="text-caption text-text-muted">
          {dayjs(article.updatedAt).format('YYYY-MM-DD HH:mm')}
        </p>
      </div>
      <IconChevronRight className="shrink-0" />
    </div>
  );
}

export namespace ArticleCard {
  export interface Props extends React.HTMLAttributes<HTMLDivElement> {
    article: Article;
  }
}
