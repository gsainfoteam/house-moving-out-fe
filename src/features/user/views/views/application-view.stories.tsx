import dayjs from 'dayjs';
import { I18nextProvider } from 'react-i18next';

import { i18n } from '@/common/lib';

import { ApplicationView } from './application-view';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof ApplicationView> = {
  title: 'User/ApplicationView',
  component: ApplicationView,
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
type Story = StoryObj<typeof ApplicationView>;

const today = dayjs().startOf('day');
const mockDays = [today, today.add(1, 'day'), today.add(2, 'day'), today.add(3, 'day')];

const mockSlots = [
  {
    uuid: 'slot-1',
    startTime: today.hour(9).minute(0),
    endTime: today.hour(10).minute(0),
    isClosed: false,
  },
  {
    uuid: 'slot-2',
    startTime: today.hour(10).minute(0),
    endTime: today.hour(11).minute(0),
    isClosed: false,
  },
  {
    uuid: 'slot-3',
    startTime: today.hour(11).minute(0),
    endTime: today.hour(12).minute(0),
    isClosed: true,
  },
  {
    uuid: 'slot-4',
    startTime: today.hour(13).minute(0),
    endTime: today.hour(14).minute(0),
    isClosed: false,
  },
  {
    uuid: 'slot-5',
    startTime: today.hour(14).minute(0),
    endTime: today.hour(15).minute(0),
    isClosed: false,
  },
  {
    uuid: 'slot-6',
    startTime: today.hour(15).minute(0),
    endTime: today.hour(16).minute(0),
    isClosed: false,
  },
  {
    uuid: 'slot-7',
    startTime: today.hour(16).minute(0),
    endTime: today.hour(17).minute(0),
    isClosed: false,
  },
  {
    uuid: 'slot-8',
    startTime: today.hour(17).minute(0),
    endTime: today.hour(18).minute(0),
    isClosed: true,
  },
  {
    uuid: 'slot-9',
    startTime: today.hour(18).minute(0),
    endTime: today.hour(19).minute(0),
    isClosed: false,
  },
  {
    uuid: 'slot-10',
    startTime: today.hour(19).minute(0),
    endTime: today.hour(20).minute(0),
    isClosed: false,
  },
  {
    uuid: 'slot-11',
    startTime: today.hour(20).minute(0),
    endTime: today.hour(21).minute(0),
    isClosed: true,
  },
  {
    uuid: 'slot-12',
    startTime: today.hour(21).minute(0),
    endTime: today.hour(22).minute(0),
    isClosed: false,
  },
];

export const NoDateSelected: Story = {
  args: {
    isLoading: false,
    inspectionDays: mockDays,
    inspectionDayTimestamp: null,
    selectedDaySlots: [],
    selectedSlotUuid: null,
    onDayChange: () => {},
    onSlotChange: () => {},
    isSubmitDisabled: true,
    onSubmit: async () => {},
  },
};

export const DateSelected: Story = {
  args: {
    isLoading: false,
    inspectionDays: mockDays,
    inspectionDayTimestamp: today.valueOf(),
    selectedDaySlots: mockSlots,
    selectedSlotUuid: null,
    onDayChange: () => {},
    onSlotChange: () => {},
    isSubmitDisabled: true,
    onSubmit: async () => {},
  },
};

export const DateAndSlotSelected: Story = {
  args: {
    isLoading: false,
    inspectionDays: mockDays,
    inspectionDayTimestamp: today.valueOf(),
    selectedDaySlots: mockSlots,
    selectedSlotUuid: 'slot-2',
    onDayChange: () => {},
    onSlotChange: () => {},
    isSubmitDisabled: false,
    onSubmit: async () => {},
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    inspectionDays: [],
    inspectionDayTimestamp: null,
    selectedDaySlots: [],
    selectedSlotUuid: null,
    onDayChange: () => {},
    onSlotChange: () => {},
    isSubmitDisabled: true,
    onSubmit: async () => {},
  },
};
