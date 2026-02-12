import dayjs from 'dayjs';
import { I18nextProvider } from 'react-i18next';

import { i18n } from '@/common/lib';

import { ScheduleCard } from '.';

import type { MoveOutSchedule, ScheduleStatus } from '../../../models';
import type { Meta, StoryObj } from '@storybook/react-vite';

const baseTime = dayjs().startOf('day');

const createMockSchedule = (overrides: Partial<MoveOutSchedule> = {}): MoveOutSchedule =>
  ({
    uuid: 'schedule-1',
    title: '2024학년도 1학기 퇴사 검사',
    status: 'ACTIVE',
    applicationStartTime: baseTime.add(7, 'day').toISOString(),
    applicationEndTime: baseTime.add(14, 'day').toISOString(),
    ...overrides,
  }) as MoveOutSchedule;

const meta: Meta<typeof ScheduleCard> = {
  title: 'Admin/ScheduleCard',
  component: ScheduleCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <I18nextProvider i18n={i18n}>
        <div className="w-[360px]">
          <Story />
        </div>
      </I18nextProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ScheduleCard>;

export const Active: Story = {
  args: {
    schedule: createMockSchedule({ status: 'ACTIVE' as ScheduleStatus }),
  },
};

export const Completed: Story = {
  args: {
    schedule: createMockSchedule({
      title: '2024학년도 1학기 퇴사 검사 (종료)',
      status: 'COMPLETED' as ScheduleStatus,
    }),
  },
};

export const Draft: Story = {
  args: {
    schedule: createMockSchedule({
      title: '2024학년도 2학기 퇴사 검사 (준비 중)',
      status: 'DRAFT' as ScheduleStatus,
    }),
  },
};

export const Canceled: Story = {
  args: {
    schedule: createMockSchedule({
      title: '취소된 일정',
      status: 'CANCELED' as ScheduleStatus,
    }),
  },
};
