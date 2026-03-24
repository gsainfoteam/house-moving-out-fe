import dayjs from 'dayjs';
import { I18nextProvider } from 'react-i18next';

import { i18n } from '@/common/lib';

import { MainScreen } from './main-screen';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof MainScreen> = {
  title: 'User/MainScreen',
  component: MainScreen,
  parameters: {
    layout: 'padded',
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
type Story = StoryObj<typeof MainScreen>;

export const NotPeriod: Story = {
  args: {
    status: 'not_period',
    isLoading: false,
    applicationStartTime: dayjs().add(7, 'day'),
  },
};

export const NotPeriodNoDate: Story = {
  args: {
    status: 'not_period',
    isLoading: false,
  },
};

export const NotTarget: Story = {
  args: {
    status: 'not_target',
    isLoading: false,
  },
};

export const CleaningService: Story = {
  args: {
    status: 'cleaning_service',
    isLoading: false,
  },
};

export const Application: Story = {
  args: {
    status: 'application',
    isLoading: false,
  },
};

export const Waiting: Story = {
  args: {
    status: 'waiting',
    isLoading: false,
    inspectionStartTime: dayjs().add(2, 'day').hour(10).minute(0),
    cancelInspection: async () => {},
  },
};

export const InProgress: Story = {
  args: {
    status: 'in_progress',
    isLoading: false,
  },
};

export const Failed: Story = {
  args: {
    status: 'failed',
    isLoading: false,
    inspectionCount: 1,
    failedItems: ['entrance-cleanliness', 'aircon-dust', 'bathroom-light'],
  },
};

export const FinalFailed: Story = {
  args: {
    status: 'failed',
    isLoading: false,
    inspectionCount: 3,
    failedItems: ['entrance-cleanliness', 'aircon-dust'],
  },
};

export const Passed: Story = {
  args: {
    status: 'passed',
    isLoading: false,
  },
};

export const Loading: Story = {
  args: {
    status: 'not_period',
    isLoading: true,
  },
};
