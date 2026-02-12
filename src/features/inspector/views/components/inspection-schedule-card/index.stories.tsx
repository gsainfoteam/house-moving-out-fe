import dayjs from 'dayjs';
import { I18nextProvider } from 'react-i18next';

import { i18n } from '@/common/lib';

import { ScheduleStatus } from '../../../models';

import { InspectionScheduleCard } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof InspectionScheduleCard> = {
  title: 'Inspector/InspectionScheduleCard',
  component: InspectionScheduleCard,
  parameters: {
    layout: 'centered',
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
type Story = StoryObj<typeof InspectionScheduleCard>;

const baseTime = dayjs().startOf('day').hour(10);

export const Draft: Story = {
  args: {
    time: baseTime,
    roomLabel: 'T012호',
    residentName: '홍길동',
    status: ScheduleStatus.DRAFT,
  },
};

export const Active: Story = {
  args: {
    time: baseTime.add(1, 'hour'),
    roomLabel: 'T045호',
    residentName: '김영희',
    status: ScheduleStatus.ACTIVE,
  },
};

export const Completed: Story = {
  args: {
    time: baseTime.add(2, 'hour').add(30, 'minute'),
    roomLabel: 'T078호',
    residentName: '이철수',
    status: ScheduleStatus.COMPLETED,
  },
};

export const List: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-3">
      <InspectionScheduleCard
        time={baseTime}
        roomLabel="T012호"
        residentName="홍길동"
        status={ScheduleStatus.DRAFT}
      />
      <InspectionScheduleCard
        time={baseTime.add(30, 'minute')}
        roomLabel="T012호"
        residentName="홍길동"
        status={ScheduleStatus.ACTIVE}
      />
      <InspectionScheduleCard
        time={baseTime.add(1, 'hour')}
        roomLabel="T012호"
        residentName="홍길동"
        status={ScheduleStatus.COMPLETED}
      />
      <InspectionScheduleCard
        time={baseTime.add(2, 'hour').add(30, 'minute')}
        roomLabel="T012호"
        residentName="홍길동"
        status={ScheduleStatus.CANCELED}
      />
    </div>
  ),
};
