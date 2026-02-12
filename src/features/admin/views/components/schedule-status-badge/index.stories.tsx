import { I18nextProvider } from 'react-i18next';

import { i18n } from '@/common/lib';

import { ScheduleStatusBadge } from '.';

import type { ScheduleStatus } from '../../../models';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof ScheduleStatusBadge> = {
  title: 'Admin/ScheduleStatusBadge',
  component: ScheduleStatusBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['ACTIVE', 'COMPLETED', 'DRAFT', 'CANCELED'],
      description: '일정 상태',
    },
  },
  decorators: [
    (Story) => (
      <I18nextProvider i18n={i18n}>
        <Story />
      </I18nextProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ScheduleStatusBadge>;

export const Active: Story = {
  args: { status: 'ACTIVE' as ScheduleStatus },
};

export const Completed: Story = {
  args: { status: 'COMPLETED' as ScheduleStatus },
};

export const Draft: Story = {
  args: { status: 'DRAFT' as ScheduleStatus },
};

export const Canceled: Story = {
  args: { status: 'CANCELED' as ScheduleStatus },
};

export const AllStatuses: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <ScheduleStatusBadge status={'ACTIVE' as ScheduleStatus} />
      <ScheduleStatusBadge status={'COMPLETED' as ScheduleStatus} />
      <ScheduleStatusBadge status={'DRAFT' as ScheduleStatus} />
      <ScheduleStatusBadge status={'CANCELED' as ScheduleStatus} />
    </div>
  ),
};
