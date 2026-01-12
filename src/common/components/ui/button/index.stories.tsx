import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowRight, Download, Plus, Search } from 'lucide-react';

import { Button } from '.';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'change', 'failed', 'disabled'],
      description: '버튼의 스타일 변형',
    },
    iconOnly: {
      control: 'boolean',
      description: '정사각형 아이콘 버튼 여부',
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
    iconOnly: false,
    disabled: false,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Button variant="default">Default Button</Button>
      <Button variant="change">Change Button</Button>
      <Button variant="failed">Failed Button</Button>
      <Button variant="default" disabled>
        Disabled Button
      </Button>
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
      <Button variant="change">
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
      <Button variant="default" iconOnly>
        <Search size={24} />
      </Button>
      <Button variant="change" iconOnly>
        <Search size={24} />
      </Button>
      <Button variant="failed" iconOnly>
        <Search size={24} />
      </Button>
      <Button variant="default" iconOnly disabled>
        <Search size={24} />
      </Button>
    </div>
  ),
};
