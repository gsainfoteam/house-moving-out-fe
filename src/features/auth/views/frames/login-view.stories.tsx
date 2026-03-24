import { I18nextProvider } from 'react-i18next';

import { i18n } from '@/common/lib';

import { LoginView } from './login-view';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof LoginView> = {
  title: 'Auth/LoginView',
  component: LoginView,
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
type Story = StoryObj<typeof LoginView>;

export const Default: Story = {
  args: {
    onLogin: () => {},
  },
};
