import { Accordion } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Accordion> = {
  title: 'User/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '아코디언 제목',
    },
    defaultOpen: {
      control: 'boolean',
      description: '초기 열림 여부',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    title: '추가 정보',
    defaultOpen: false,
    children: (
      <ul className="text-box2 text-text-black flex flex-col gap-2">
        <li>· 책상 서랍 정리가 필요해요.</li>
        <li>· 욕실 청소 상태를 다시 확인해 주세요.</li>
      </ul>
    ),
  },
};

export const DefaultOpen: Story = {
  args: {
    title: '검사 미통과 사유',
    defaultOpen: true,
    children: (
      <ul className="text-box2 text-text-black flex flex-col gap-2">
        <li>· 책상 서랍 정리가 필요해요.</li>
        <li>· 욕실 청소 상태를 다시 확인해 주세요.</li>
      </ul>
    ),
  },
};

export const LongContent: Story = {
  args: {
    title: '상세 안내',
    defaultOpen: false,
    children: (
      <div className="text-box2 text-text-black space-y-2">
        <p>
          퇴사 검사 신청 후 지정된 일시에 검사가 진행됩니다. 검사 통과 시 다음 단계로 이동할 수
          있으며, 미통과 시 사유를 확인한 뒤 재신청해 주세요.
        </p>
        <p>문의사항은 사감실로 연락 부탁드립니다.</p>
      </div>
    ),
  },
};
