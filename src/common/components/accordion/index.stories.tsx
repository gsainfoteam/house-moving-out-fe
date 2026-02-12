import { Accordion } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Accordion.Root> = {
  title: 'Common/Accordion',
  component: Accordion.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Accordion.Root>;

export const Default: Story = {
  render: () => (
    <Accordion.Root defaultOpen={false}>
      <Accordion.Header>
        <Accordion.Title>추가 정보</Accordion.Title>
      </Accordion.Header>
      <Accordion.Content>
        <ul className="text-box2 text-text-black flex flex-col gap-2">
          <li>· 책상 서랍 정리가 필요해요.</li>
          <li>· 욕실 청소 상태를 다시 확인해 주세요.</li>
        </ul>
      </Accordion.Content>
    </Accordion.Root>
  ),
};

export const WithTrailing: Story = {
  render: () => (
    <Accordion.Root defaultOpen={true}>
      <Accordion.Header>
        <Accordion.Title>가구 및 에어컨</Accordion.Title>
        <span className="text-primary-main ml-auto">(5/5)</span>
      </Accordion.Header>
      <Accordion.Content>
        <ul className="text-box2 text-text-black flex flex-col gap-3">
          <li className="flex items-center justify-between gap-2">
            <span>옷장 청결 확인</span>
            <input type="checkbox" defaultChecked className="size-5" />
          </li>
          <li className="flex items-center justify-between gap-2">
            <span>에어컨 먼지 확인</span>
            <input type="checkbox" defaultChecked className="size-5" />
          </li>
          <li className="flex items-center justify-between gap-2">
            <span>책꽂이 청결 확인</span>
            <input type="checkbox" defaultChecked className="size-5" />
          </li>
          <li className="flex items-center justify-between gap-2">
            <span>책상 청결 확인</span>
            <input type="checkbox" defaultChecked className="size-5" />
          </li>
          <li className="flex items-center justify-between gap-2">
            <span>서랍 청결 확인</span>
            <input type="checkbox" defaultChecked className="size-5" />
          </li>
        </ul>
      </Accordion.Content>
    </Accordion.Root>
  ),
};
