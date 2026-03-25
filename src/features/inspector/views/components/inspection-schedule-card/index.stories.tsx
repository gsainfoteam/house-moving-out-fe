import dayjs from 'dayjs';

import { ApplicationStatus } from '@/features/admin';

import { InspectionScheduleCard } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof InspectionScheduleCard> = {
  title: 'Inspector/InspectionScheduleCard',
  component: InspectionScheduleCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof InspectionScheduleCard>;

const baseTime = dayjs().startOf('day').hour(10);

export const Draft: Story = {
  args: {
    time: baseTime,
    roomLabel: 'T012호',
    residentName: '홍길동',
    status: null,
  },
};

export const Active: Story = {
  args: {
    time: baseTime.add(1, 'hour'),
    roomLabel: 'T045호',
    residentName: '김영희',
    status: null,
  },
};

export const Completed: Story = {
  args: {
    time: baseTime.add(2, 'hour').add(30, 'minute'),
    roomLabel: 'T078호',
    residentName: '이철수',
    status: ApplicationStatus.PASSED,
  },
};

export const List: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-3">
      <InspectionScheduleCard
        time={baseTime}
        roomLabel="T012호"
        residentName="홍길동"
        status={null}
      />
      <InspectionScheduleCard
        time={baseTime.add(30, 'minute')}
        roomLabel="T012호"
        residentName="홍길동"
        status={null}
      />
      <InspectionScheduleCard
        time={baseTime.add(1, 'hour')}
        roomLabel="T012호"
        residentName="홍길동"
        status={ApplicationStatus.PASSED}
      />
      <InspectionScheduleCard
        time={baseTime.add(2, 'hour').add(30, 'minute')}
        roomLabel="T012호"
        residentName="홍길동"
        status={ApplicationStatus.FAILED}
      />
    </div>
  ),
};
