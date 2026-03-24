import { RouterContextProvider } from '@tanstack/react-router';

import dayjs from 'dayjs';
import { I18nextProvider } from 'react-i18next';

import { i18n } from '@/common/lib';
import { router } from '@/main';

import { InspectionListScreen } from './inspection-list-screen';
import { ApplicationStatus } from '../../viewmodels';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof InspectionListScreen> = {
  title: 'Inspector/InspectionListScreen',
  component: InspectionListScreen,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <RouterContextProvider router={router}>
        <I18nextProvider i18n={i18n}>
          <Story />
        </I18nextProvider>
      </RouterContextProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof InspectionListScreen>;

const baseTime = dayjs().startOf('day').hour(10);

const mockTargets: InspectionListScreen.Target[] = [
  {
    uuid: 'target-1',
    inspectionTime: baseTime.toISOString(),
    roomNumber: 'T012호',
    residents: [{ name: '홍길동' }],
    status: null,
  },
  {
    uuid: 'target-2',
    inspectionTime: baseTime.add(30, 'minute').toISOString(),
    roomNumber: 'T034호',
    residents: [{ name: '김영희' }, { name: '이철수' }],
    status: null,
  },
  {
    uuid: 'target-3',
    inspectionTime: baseTime.add(1, 'hour').toISOString(),
    roomNumber: 'T056호',
    residents: [{ name: '박민준' }],
    status: ApplicationStatus.PASSED,
  },
  {
    uuid: 'target-4',
    inspectionTime: baseTime.add(2, 'hour').toISOString(),
    roomNumber: 'T078호',
    residents: [{ name: '최서연' }],
    status: ApplicationStatus.FAILED,
  },
];

export const WithTargets: Story = {
  args: {
    targets: mockTargets,
    isLoading: false,
  },
};

export const Loading: Story = {
  args: {
    targets: [],
    isLoading: true,
  },
};

export const Empty: Story = {
  args: {
    targets: [],
    isLoading: false,
  },
};
