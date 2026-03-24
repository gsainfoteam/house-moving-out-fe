import { I18nextProvider } from 'react-i18next';

import { i18n } from '@/common/lib';

import { LoginScreen } from './login-screen';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof LoginScreen> = {
  title: 'Auth/LoginScreen',
  component: LoginScreen,
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
type Story = StoryObj<typeof LoginScreen>;

export const Default: Story = {
  args: {
    onLogin: () => {},
  },
};
