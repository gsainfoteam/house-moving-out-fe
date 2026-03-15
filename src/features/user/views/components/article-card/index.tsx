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
        'bg-bg-white border-icon-light-gray hover:bg-bg-surface border transition-colors duration-200',
        'flex w-full items-center justify-between rounded-xl p-3.5',
        className,
      )}
      {...props}
    >
      <div className="flex flex-col items-start gap-2">
        <div className="flex items-center gap-2">
          {article.type === ArticleType.NOTICE ? (
            <IconBellFilled className="text-primary-main shrink-0" />
          ) : (
            <IconMessageFilled className="text-icon-gray shrink-0" />
          )}
          <div className="text-button text-text-black">{title}</div>
        </div>
        <p className="text-text-gray">{dayjs(article.updatedAt).format('YYYY-MM-DD HH:mm')}</p>
      </div>
      <IconChevronRight />
    </div>
  );
}

export namespace ArticleCard {
  export interface Props extends React.HTMLAttributes<HTMLDivElement> {
    article: Article;
  }
}
