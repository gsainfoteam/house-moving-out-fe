import { Inbox } from 'lucide-react';

import { LayoutCard } from '../layout-card';

import { useList } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

type Item = {
  id: number;
  label: string;
};

function ListPreview({ items }: { items: Item[] }) {
  const list = useList(items);

  return (
    <div className="h-105 w-90">
      <LayoutCard.Root>
        <LayoutCard.Header>
          <LayoutCard.Text>
            <LayoutCard.Title>이사 점검 목록</LayoutCard.Title>
            <LayoutCard.Description>신청 내역을 확인해 주세요.</LayoutCard.Description>
          </LayoutCard.Text>
        </LayoutCard.Header>

        <LayoutCard.Body className="h-full w-full items-start justify-start">
          <list.Root className="h-full w-full gap-2">
            <list.Empty
              className="h-full"
              icon={<Inbox />}
              title="신청 내역이 없습니다"
              description="새 점검 일정을 등록해 주세요"
            />

            <list.Builder className="flex w-full flex-col gap-2">
              {(item) => (
                <li key={item.id} className="border-border rounded-lg border px-3 py-2">
                  <span className="text-body text-text-primary">{item.label}</span>
                </li>
              )}
            </list.Builder>
          </list.Root>
        </LayoutCard.Body>
      </LayoutCard.Root>
    </div>
  );
}

const meta = {
  title: 'Common/List',
  component: ListPreview,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ListPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

const sampleItems: Item[] = [
  { id: 1, label: '3월 28일 14:00 - 14:30' },
  { id: 2, label: '3월 29일 10:00 - 10:30' },
];

export const EmptyInLayoutCard: Story = {
  args: {
    items: [],
  },
  render: (args) => <ListPreview items={args.items} />,
};

export const WithItems: Story = {
  args: {
    items: sampleItems,
  },
  render: (args) => <ListPreview items={args.items} />,
};
