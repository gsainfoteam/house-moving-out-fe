import { Input } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Input> = {
  title: 'Common/UI/Input',
  component: Input,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};
export const Error: Story = {
  args: { variant: 'error' },
};
