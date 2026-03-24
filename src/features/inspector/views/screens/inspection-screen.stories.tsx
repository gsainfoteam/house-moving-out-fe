import { RouterContextProvider } from '@tanstack/react-router';

import { useForm } from 'react-hook-form';
import { I18nextProvider } from 'react-i18next';

import { i18n } from '@/common/lib';
import type { checklist } from '@/common/lib';
import { router } from '@/main';

import { InspectionScreen } from './inspection-screen';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof InspectionScreen> = {
  title: 'Inspector/InspectionScreen',
  component: InspectionScreen,
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
type Story = StoryObj<typeof InspectionScreen>;

const mockTarget = {
  roomNumber: 'T012호',
  residents: [{ name: '홍길동' }],
};

type InspectionFormFields = {
  items: Record<checklist.Item, boolean>;
  note: string;
  inspectorSignature: string;
  targetSignature: string;
};

function InspectionScreenWrapper({ roomType }: { roomType: InspectionScreen.Props['roomType'] }) {
  const { register } = useForm<InspectionFormFields>();

  return (
    <InspectionScreen
      isLoading={false}
      target={mockTarget}
      roomType={roomType}
      register={register}
      getSectionProgress={() => ({ totalCount: 3, completedCount: 0, isCompleted: false })}
      isAllChecked={false}
      uuid="test-uuid"
    />
  );
}

function InspectionScreenLoadingWrapper() {
  const { register } = useForm<InspectionFormFields>();

  return (
    <InspectionScreen
      isLoading={true}
      target={undefined}
      roomType={undefined}
      register={register}
      getSectionProgress={() => ({ totalCount: 0, completedCount: 0, isCompleted: false })}
      isAllChecked={false}
      uuid="test-uuid"
    />
  );
}

export const TypeB: Story = {
  render: () => <InspectionScreenWrapper roomType="b" />,
};

export const Solo: Story = {
  render: () => <InspectionScreenWrapper roomType="solo" />,
};

export const Loading: Story = {
  render: () => <InspectionScreenLoadingWrapper />,
};
