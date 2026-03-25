import { LoginScreen } from './login-screen';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof LoginScreen> = {
  title: 'Auth/LoginScreen',
  component: LoginScreen,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LoginScreen>;

export const Default: Story = {
  args: {
    onLogin: () => {},
  },
};
