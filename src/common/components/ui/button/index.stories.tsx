import { ArrowRight, Download, Plus, Search } from 'lucide-react';

import { Button } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Button> = {
  title: 'Common/UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'failed', 'failed-outline', 'disabled'],
      description: '버튼의 스타일 변형',
    },
    size: {
      control: 'select',
      options: ['icon', 'default', 'full'],
      description: '버튼의 크기',
    },
    disabled: {
      control: 'boolean',
      description: '버튼 비활성화 여부',
    },
    children: {
      control: 'text',
      description: '버튼 내부 텍스트',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Playground: Story = {
  args: {
    variant: 'default',
    children: '퇴사 검사 신청하기',
    size: 'default',
    disabled: false,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Button variant="default">Default Button</Button>
      <Button variant="outline">Outline Button</Button>
      <Button variant="failed">Failed Button</Button>
      <Button variant="failed-outline">Failed Outline Button</Button>
      <Button variant="default" disabled>
        Disabled Button
      </Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Button size="icon">
        <Search size={24} />
      </Button>
      <Button size="default">Default Size Button</Button>
      <Button size="full">Full Size Button</Button>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Button variant="default">
        <Download size={24} />
        다운로드
      </Button>
      <Button variant="outline">
        <Download size={24} />
        다운로드
      </Button>
      <Button variant="default">
        다음 단계
        <ArrowRight size={24} />
      </Button>
      <Button variant="default">
        <Plus size={24} />
        새 항목 추가
        <ArrowRight size={24} />
      </Button>
    </div>
  ),
};

export const IconOnly: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button variant="default" size="icon">
        <Search size={24} />
      </Button>
      <Button variant="outline" size="icon">
        <Search size={24} />
      </Button>
      <Button variant="failed" size="icon">
        <Search size={24} />
      </Button>
      <Button variant="failed-outline" size="icon">
        <Search size={24} />
      </Button>
      <Button variant="default" size="icon" disabled>
        <Search size={24} />
      </Button>
    </div>
  ),
};

export const InteractionStates: Story = {
  args: {
    variant: 'default',
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="text-body text-text-gray">
        Hover: 마우스를 올려 상태 레이어 확인 / Focus Visible: Tab으로 포커스 이동해 포커스 링 확인
        / Active: 클릭 유지
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button variant={args.variant}>Hover me</Button>
        <Button variant={args.variant} autoFocus>
          Focus visible (Tab)
        </Button>
        <Button variant={args.variant}>Active (click &amp; hold)</Button>
      </div>
    </div>
  ),
};
