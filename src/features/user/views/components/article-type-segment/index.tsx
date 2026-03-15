import { useTranslation } from 'react-i18next';

import { cn, cv } from '@/common/utils';

import { ArticleType } from '../../../models';

export function ArticleTypeSegment({ value, onChange, className }: ArticleTypeSegment.Props) {
  const { t } = useTranslation('user');

  const items: ArticleTypeSegment.Item[] = [
    {
      type: ArticleType.NOTICE,
      label: t('list.segment.notice'),
    },
    {
      type: ArticleType.FAQ,
      label: t('list.segment.faq'),
    },
  ];

  return (
    <div className={cn(ArticleTypeSegment.containerStyles(), className)}>
      {items.map((item) => {
        const isActive = item.type === value;
        return (
          <button
            key={item.type}
            type="button"
            className={ArticleTypeSegment.tabStyles({ active: isActive })}
            aria-pressed={isActive}
            onClick={() => {
              if (!isActive) {
                onChange(item.type);
              }
            }}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

export namespace ArticleTypeSegment {
  export type Props = {
    value: ArticleType;
    onChange: (next: ArticleType) => void;
    className?: string;
  };

  export type Item = {
    type: ArticleType;
    label: string;
  };

  export const containerStyles = cv({
    base: [
      'bg-icon-gray/40 text-body2 flex h-10 w-full items-center justify-between rounded-full p-1',
    ],
  });

  export const tabStyles = cv({
    base: [
      'flex-1 rounded-full px-3 py-1 text-center transition-colors',
      'text-text-gray',
    ],
    variants: {
      active: {
        true: ['bg-bg-white text-text-black shadow-sm'],
        false: [],
      },
    },
  });
}

