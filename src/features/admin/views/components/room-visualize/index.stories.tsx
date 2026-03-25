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
      <div className="max-w-4xl overflow-auto">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RoomVisualize>;

export const Default: Story = {};
