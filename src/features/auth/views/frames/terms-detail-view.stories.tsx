import { I18nextProvider } from 'react-i18next';

import { i18n } from '@/common/lib';

import { TermsDetailView } from './terms-detail-view';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof TermsDetailView> = {
  title: 'Auth/TermsDetailView',
  component: TermsDetailView,
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
type Story = StoryObj<typeof TermsDetailView>;

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
