import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowRight, Download, Plus, Search, Settings } from 'lucide-react';

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
      options: ['primary', 'secondary'],
      description: '버튼의 스타일 변형',
    },
    icon: {
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

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    children: 'Disabled Button',
    disabled: true,
  },
};

export const LongText: Story = {
  args: {
    variant: 'primary',
    children: '긴 텍스트가 들어간 버튼입니다',
  },
};

export const WithIcon: Story = {
  args: {
    variant: 'primary',
    children: (
      <>
        <Download size={16} />
        다운로드
      </>
    ),
  },
};

export const WithIconRight: Story = {
  args: {
    variant: 'primary',
    children: (
      <>
        다음 단계
        <ArrowRight size={16} />
      </>
    ),
  },
};

export const WithMultipleIcons: Story = {
  args: {
    variant: 'primary',
    children: (
      <>
        <Plus size={16} />
        새 항목 추가
        <Settings size={16} />
      </>
    ),
  },
};

export const IconOnly: Story = {
  args: {
    variant: 'primary',
    icon: true,
    children: <Search size={20} />,
  },
};

export const SecondaryWithIcons: Story = {
  args: {
    variant: 'secondary',
    children: (
      <>
        <Download size={16} />
        다운로드
        <ArrowRight size={16} />
      </>
    ),
  },
};

export const IconButton: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button variant="primary" icon>
        <Search size={20} />
      </Button>
      <Button variant="secondary" icon>
        <Search size={20} />
      </Button>
    </div>
  ),
};
