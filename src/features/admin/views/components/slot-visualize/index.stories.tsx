import dayjs from 'dayjs';
import { useState } from 'react';

import { SlotVisualize } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const sunday = dayjs().day(0).startOf('day');
const createSlots = () => {
  const slots: { uuid: string; startTime: string; reservedCount: number }[] = [];
  [4, 5, 6, 7].forEach((d) => {
    const startOfDay = sunday.day(d);
    [10, 10.5, 11, 11.5, 14, 14.5].forEach((h, i) => {
      const startTime = startOfDay.add(h, 'hour').toISOString();
      slots.push({
        uuid: `slot-${d}-${h}-${i}`,
        startTime,
        reservedCount: Math.floor(Math.random() * 4),
      });
    });
  });
  return slots;
};

const mockSlots = createSlots();

const meta: Meta<typeof SlotVisualize> = {
  title: 'Admin/SlotVisualize',
  component: SlotVisualize,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '테이블 제목',
    },
    capacity: {
      control: { type: 'number', min: 1, max: 10 },
      description: '슬롯당 정원 (null이면 검사자용)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SlotVisualize>;

export const Default: Story = {
  args: {
    slots: mockSlots,
    title: '예약 현황',
    capacity: 4,
    selectedSlots: [],
  },
};

export const WithSelection: Story = {
  render: function WithSelectionStory() {
    const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
    const toggle = (uuid: string, enable: boolean) => {
      setSelectedSlots((prev) =>
        enable ? [...prev, uuid] : prev.filter((id) => id !== uuid),
      );
    };
    return (
      <div className="overflow-auto">
        <SlotVisualize
          slots={mockSlots}
          title="슬롯 선택 (드래그)"
          capacity={4}
          onClick={toggle}
          selectedSlots={selectedSlots}
        />
      </div>
    );
  },
};

export const InspectorView: Story = {
  args: {
    slots: mockSlots,
    title: '검사자 배정',
    capacity: null,
  },
};
