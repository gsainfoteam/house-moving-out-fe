import { useForm } from 'react-hook-form';
import { I18nextProvider } from 'react-i18next';
import { RouterContextProvider } from '@tanstack/react-router';

import { i18n } from '@/common/lib';
import type { checklist } from '@/common/lib';
import { router } from '@/main';

import { InspectionView } from './inspection-view';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof InspectionView> = {
  title: 'Inspector/InspectionView',
  component: InspectionView,
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
type Story = StoryObj<typeof InspectionView>;

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

function InspectionViewWrapper({
  roomType,
}: {
  roomType: InspectionView.Props['roomType'];
}) {
  const { register } = useForm<InspectionFormFields>();

  return (
    <InspectionView
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

export const TypeB: Story = {
  render: () => <InspectionViewWrapper roomType="b" />,
};

export const Solo: Story = {
  render: () => <InspectionViewWrapper roomType="solo" />,
};

export const Loading: Story = {
  render: () => {
    const { register } = useForm<InspectionFormFields>();
    return (
      <InspectionView
        isLoading={true}
        target={undefined}
        roomType={undefined}
        register={register}
        getSectionProgress={() => ({ totalCount: 0, completedCount: 0, isCompleted: false })}
        isAllChecked={false}
        uuid="test-uuid"
      />
    );
  },
};
