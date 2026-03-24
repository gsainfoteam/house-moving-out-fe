import { useState } from 'react';

import { I18nextProvider } from 'react-i18next';

import { i18n } from '@/common/lib';
import type { Article } from '@/features/user';

import { ArticleType } from '../../viewmodels';
import { ArticleListView } from './article-list-view';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof ArticleListView> = {
  title: 'User/ArticleListView',
  component: ArticleListView,
  parameters: {
    layout: 'padded',
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
type Story = StoryObj<typeof ArticleListView>;

const mockNotices: Article[] = [
  {
    uuid: '1',
    type: ArticleType.NOTICE,
    titleKo: '2024년 퇴사 안내',
    titleEn: 'Move-out Notice 2024',
    updatedAt: '2024-03-15T10:00:00.000Z',
  } as Article,
  {
    uuid: '2',
    type: ArticleType.NOTICE,
    titleKo: '청소 기준 안내',
    titleEn: 'Cleaning Guidelines',
    updatedAt: '2024-03-10T09:00:00.000Z',
  } as Article,
  {
    uuid: '3',
    type: ArticleType.NOTICE,
    titleKo: '이사 일정 변경 안내',
    titleEn: 'Schedule Change Notice',
    updatedAt: '2024-03-05T14:00:00.000Z',
  } as Article,
];

const mockFaqs: Article[] = [
  {
    uuid: '4',
    type: ArticleType.FAQ,
    titleKo: '이사 신청은 어떻게 하나요?',
    titleEn: 'How do I apply for moving?',
    updatedAt: '2024-03-14T15:30:00.000Z',
  } as Article,
  {
    uuid: '5',
    type: ArticleType.FAQ,
    titleKo: '반입 가능 물품이 궁금해요',
    titleEn: 'What items can I bring?',
    updatedAt: '2024-03-13T09:00:00.000Z',
  } as Article,
];

export const WithNotices: Story = {
  args: {
    type: ArticleType.NOTICE,
    onTypeChange: () => {},
    articles: mockNotices,
    totalCount: 3,
    page: 1,
    onPageChange: () => {},
    isLoading: false,
  },
};

export const Loading: Story = {
  args: {
    type: ArticleType.NOTICE,
    onTypeChange: () => {},
    articles: [],
    totalCount: 0,
    page: 1,
    onPageChange: () => {},
    isLoading: true,
  },
};

export const Empty: Story = {
  args: {
    type: ArticleType.NOTICE,
    onTypeChange: () => {},
    articles: [],
    totalCount: 0,
    page: 1,
    onPageChange: () => {},
    isLoading: false,
  },
};

export const Interactive: Story = {
  render: () => {
    const [type, setType] = useState<ArticleType>(ArticleType.NOTICE);
    const [page, setPage] = useState(1);
    const articles = type === ArticleType.NOTICE ? mockNotices : mockFaqs;

    return (
      <ArticleListView
        type={type}
        onTypeChange={(t) => {
          setType(t);
          setPage(1);
        }}
        articles={articles}
        totalCount={articles.length}
        page={page}
        onPageChange={setPage}
        isLoading={false}
      />
    );
  },
};
