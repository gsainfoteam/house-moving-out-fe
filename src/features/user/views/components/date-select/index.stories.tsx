import { useState } from 'react';

import dayjs from 'dayjs';

import { DateSelect } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const mockDays = [0, 1, 2, 3].map((i) => dayjs().startOf('day').add(i, 'day'));

const meta: Meta<typeof DateSelect> = {
  title: 'User/DateSelect',
  component: DateSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DateSelect>;

export const Playground: Story = {
  render: function PlaygroundStory() {
    const [value, setValue] = useState<dayjs.Dayjs | null>(null);
    return (
      <div className="w-[360px]">
        <DateSelect days={mockDays} value={value} onChange={setValue} />
      </div>
    );
  },
};

export const Default: Story = {
  args: {
    days: mockDays,
    value: null,
    onChange: () => {},
  },
  render: (args) => (
    <div className="w-[360px]">
      <DateSelect {...args} />
    </div>
  ),
};

export const WithSelection: Story = {
  args: {
    days: mockDays,
    value: mockDays[1],
    onChange: () => {},
  },
  render: (args) => (
    <div className="w-[360px]">
      <DateSelect {...args} />
    </div>
  ),
};
