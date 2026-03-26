import { useState } from 'react';

import { Layout } from '@/common/components';
import type { Article } from '@/features/user';

import { ArticleListScreen } from './article-list-screen';
import { ArticleType } from '../../viewmodels';

import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';

const withLayout: Decorator = (Story) => (
  <Layout onMenuOpen={() => {}}>
    <Story />
  </Layout>
);

const meta: Meta<typeof ArticleListScreen> = {
  title: 'User/ArticleListScreen',
  component: ArticleListScreen,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [withLayout],
  tags: ['autodocs'],
  args: {
    onLoadMore: () => {},
    hasMore: false,
    isFetchingMore: false,
  },
};

export default meta;
type Story = StoryObj<typeof ArticleListScreen>;

const mockNotices: Article[] = Array.from(
  { length: 5 },
  (_, i) =>
    ({
      uuid: String(i + 1),
      type: ArticleType.NOTICE,
      titleKo: `공지사항 ${i + 1}번`,
      titleEn: `Notice ${i + 1}`,
      updatedAt: new Date(Date.now() - i * 86400000).toISOString(),
    }) as Article,
);

const manyNotices: Article[] = Array.from(
  { length: 20 },
  (_, i) =>
    ({
      uuid: String(i + 1),
      type: ArticleType.NOTICE,
      titleKo: `공지사항 ${i + 1}번`,
      titleEn: `Notice ${i + 1}`,
      updatedAt: new Date(Date.now() - i * 86400000).toISOString(),
    }) as Article,
);

const manyFaqs: Article[] = Array.from(
  { length: 15 },
  (_, i) =>
    ({
      uuid: String(100 + i + 1),
      type: ArticleType.FAQ,
      titleKo: `자주 묻는 질문 ${i + 1}번`,
      titleEn: `FAQ ${i + 1}`,
      updatedAt: new Date(Date.now() - i * 43200000).toISOString(),
    }) as Article,
);

export const WithNotices: Story = {
  args: {
    type: ArticleType.NOTICE,
    onTypeChange: () => {},
    articles: mockNotices,
    totalCount: 5,
    isLoading: false,
  },
};

export const HasMore: Story = {
  args: {
    type: ArticleType.NOTICE,
    onTypeChange: () => {},
    articles: mockNotices,
    totalCount: 20,
    isLoading: false,
    hasMore: true,
  },
};

export const Loading: Story = {
  args: {
    type: ArticleType.NOTICE,
    onTypeChange: () => {},
    articles: [],
    totalCount: 0,
    isLoading: true,
  },
};

export const Empty: Story = {
  args: {
    type: ArticleType.NOTICE,
    onTypeChange: () => {},
    articles: [],
    totalCount: 0,
    isLoading: false,
  },
};

export const Interactive: Story = {
  render: () => {
    const [type, setType] = useState<ArticleType>(ArticleType.NOTICE);
    const allArticles = type === ArticleType.NOTICE ? manyNotices : manyFaqs;
    const [loaded, setLoaded] = useState(10);

    const articles = allArticles.slice(0, loaded);
    const hasMore = loaded < allArticles.length;

    return (
      <ArticleListScreen
        type={type}
        onTypeChange={(t) => {
          setType(t);
          setLoaded(10);
        }}
        articles={articles}
        totalCount={allArticles.length}
        isLoading={false}
        hasMore={hasMore}
        isFetchingMore={false}
        onLoadMore={() => setLoaded((n) => Math.min(n + 10, allArticles.length))}
      />
    );
  },
};
