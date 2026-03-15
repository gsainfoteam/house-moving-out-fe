import { I18nextProvider } from 'react-i18next';

import { i18n } from '@/common/lib';
import { ArticleType, type Article } from '@/features/user';

import { ArticleCard } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof ArticleCard> = {
  title: 'User/ArticleCard',
  component: ArticleCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <I18nextProvider i18n={i18n}>
        <Story />
      </I18nextProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ArticleCard>;

const noticeArticle: Article = {
  uuid: 'notice-1',
  type: ArticleType.NOTICE,
  titleKo: '2024년 이사 일정 안내',
  titleEn: 'Moving Schedule Notice 2024',
  updatedAt: '2024-03-15T10:00:00.000Z',
} as Article;

const faqArticle: Article = {
  uuid: 'faq-1',
  type: ArticleType.FAQ,
  titleKo: '이사 신청은 어떻게 하나요?',
  titleEn: 'How do I apply for moving?',
  updatedAt: '2024-03-14T15:30:00.000Z',
} as Article;

export const Notice: Story = {
  args: {
    article: noticeArticle,
  },
};

export const FAQ: Story = {
  args: {
    article: faqArticle,
  },
};

export const List: Story = {
  render: () => (
    <div className="flex w-100 flex-col gap-3">
      <ArticleCard article={noticeArticle} />
      <ArticleCard article={faqArticle} />
      <ArticleCard
        article={{
          ...faqArticle,
          uuid: 'faq-2',
          titleKo: '반입 가능 물품이 궁금해요',
          titleEn: 'What items can I bring in?',
          updatedAt: '2024-03-13T09:00:00.000Z',
        }}
      />
    </div>
  ),
};
