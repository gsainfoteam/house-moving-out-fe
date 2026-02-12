import { useState } from 'react';

import dayjs from 'dayjs';

import { TimeSelect } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const baseTime = dayjs().startOf('day').hour(10).minute(0);

const mockSlots: TimeSelect.Slot[] = [0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => ({
  uuid: `slot-${i}`,
  startTime: baseTime.add(i * 30, 'minute'),
  endTime: baseTime.add(i * 30 + 30, 'minute'),
  isClosed: false,
}));

const mockSlotsWithClosed: TimeSelect.Slot[] = mockSlots.map((slot, i) => ({
  ...slot,
  isClosed: i === 2 || i === 4 || i === 5,
}));

const meta: Meta<typeof TimeSelect> = {
  title: 'User/TimeSelect',
  component: TimeSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TimeSelect>;

export const Playground: Story = {
  render: function PlaygroundStory() {
    const [value, setValue] = useState<string | null>(null);
    return (
      <div className="grid w-[360px] grid-cols-3 gap-2">
        {mockSlots.map((slot) => (
          <TimeSelect
            key={slot.uuid}
            slot={slot}
            value={value}
            onChange={(s) => setValue(s.uuid)}
          />
        ))}
      </div>
    );
  },
};

export const Default: Story = {
  args: {
    slot: mockSlots[0],
    value: null,
    onChange: () => {},
  },
  render: (args) => (
    <div className="w-[120px]">
      <TimeSelect {...args} />
    </div>
  ),
};

export const WithSelection: Story = {
  args: {
    slot: mockSlots[1],
    value: mockSlots[1].uuid,
    onChange: () => {},
  },
  render: (args) => (
    <div className="w-[120px]">
      <TimeSelect {...args} />
    </div>
  ),
};

export const WithClosed: Story = {
  args: {
    slot: mockSlotsWithClosed[2],
    value: null,
    onChange: () => {},
  },
  render: (args) => (
    <div className="w-[120px]">
      <TimeSelect {...args} />
    </div>
  ),
};

export const Grid: Story = {
  render: function GridStory() {
    const [value, setValue] = useState<string | null>(null);
    return (
      <div className="grid w-[360px] grid-cols-3 gap-2">
        {mockSlotsWithClosed.map((slot) => (
          <TimeSelect
            key={slot.uuid}
            slot={slot}
            value={value}
            onChange={(s) => setValue(s.uuid)}
          />
        ))}
      </div>
    );
  },
};
