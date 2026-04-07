import { Layout } from '@/common/components';

import { ArticleDetailScreen } from './article-detail-screen';

import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';

const withLayout: Decorator = (Story) => (
  <Layout onMenuOpen={() => {}}>
    <Story />
  </Layout>
);

const meta: Meta<typeof ArticleDetailScreen> = {
  title: 'User/ArticleDetailScreen',
  component: ArticleDetailScreen,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [withLayout],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ArticleDetailScreen>;

export const WithContent: Story = {
  args: {
    title: '2024년 퇴사 안내',
    content:
      '안녕하세요. 2024년 퇴사 절차에 대해 안내드립니다.\n\n퇴사 전 반드시 방 청소를 완료해 주세요. 청소 기준은 별도 공지를 참고해 주시기 바랍니다.\n\n문의사항은 관리실로 연락해 주세요.',
    updatedAt: '2024-03-15 10:00',
    isLoading: false,
  },
};

export const Loading: Story = {
  args: {
    title: undefined,
    content: undefined,
    updatedAt: '',
    isLoading: true,
  },
};
