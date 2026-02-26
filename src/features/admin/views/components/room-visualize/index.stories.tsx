import { I18nextProvider } from 'react-i18next';

import { i18n } from '@/common/lib';

import { RoomVisualize } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof RoomVisualize> = {
  title: 'Admin/RoomVisualize',
  component: RoomVisualize,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <I18nextProvider i18n={i18n}>
        <div className="max-w-4xl overflow-auto">
          <Story />
        </div>
      </I18nextProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RoomVisualize>;

export const Default: Story = {};
