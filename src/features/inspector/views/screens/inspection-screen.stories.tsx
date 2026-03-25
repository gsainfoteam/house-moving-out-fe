import { useForm } from 'react-hook-form';

import type { checklist } from '@/common/lib';

import { InspectionScreen } from './inspection-screen';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof InspectionScreen> = {
  title: 'Inspector/InspectionScreen',
  component: InspectionScreen,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    isNoneChecked: { control: 'boolean' },
  },
  args: {
    isNoneChecked: true,
  },
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

function InspectionScreenWrapper({
  roomType,
  isNoneChecked,
}: {
  roomType: InspectionScreen.Props['roomType'];
  isNoneChecked: boolean;
}) {
  const { register } = useForm<InspectionFormFields>();

  return (
    <InspectionScreen
      isLoading={false}
      target={mockTarget}
      roomType={roomType}
      register={register}
      getSectionProgress={() => ({ totalCount: 3, completedCount: 0, isCompleted: false })}
      isAllChecked={false}
      isNoneChecked={isNoneChecked}
      onNoShowRequest={async () => '010-1234-5678'}
      onNoShowConfirm={async () => {}}
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
      isNoneChecked={false}
      onNoShowRequest={async () => '010-1234-5678'}
      onNoShowConfirm={async () => {}}
      uuid="test-uuid"
    />
  );
}

export const TypeB: Story = {
  render: ({ isNoneChecked }) => (
    <InspectionScreenWrapper roomType="b" isNoneChecked={isNoneChecked} />
  ),
};

export const Solo: Story = {
  render: ({ isNoneChecked }) => (
    <InspectionScreenWrapper roomType="solo" isNoneChecked={isNoneChecked} />
  ),
};

export const Loading: Story = {
  render: () => <InspectionScreenLoadingWrapper />,
};
