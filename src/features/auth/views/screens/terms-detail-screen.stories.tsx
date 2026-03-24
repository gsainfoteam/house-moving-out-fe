import { I18nextProvider } from 'react-i18next';

import { i18n } from '@/common/lib';

import { TermsDetailScreen } from './terms-detail-screen';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof TermsDetailScreen> = {
  title: 'Auth/TermsDetailScreen',
  component: TermsDetailScreen,
  parameters: {
    layout: 'fullscreen',
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
type Story = StoryObj<typeof TermsDetailScreen>;

export const Privacy: Story = {
  args: {
    title: '개인정보처리방침',
    termsUrl: 'https://terms.gistory.me/embedded/moving-out/privacy/260301/',
    onBack: () => {},
  },
};

export const TermsOfService: Story = {
  args: {
    title: '이용약관',
    termsUrl: 'https://terms.gistory.me/embedded/moving-out/tos/260301/',
    onBack: () => {},
  },
};
