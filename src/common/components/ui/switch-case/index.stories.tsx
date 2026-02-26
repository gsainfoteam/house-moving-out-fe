import { SwitchCase } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

type Status = 'idle' | 'loading' | 'success' | 'error';

const meta: Meta<typeof SwitchCase<Status>> = {
  title: 'Common/UI/SwitchCase',
  component: SwitchCase as React.ComponentType<React.PropsWithChildren<{ value: Status; caseBy: Partial<Record<Status, React.ReactNode>>; defaultComponent?: React.ReactNode }>>,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'select',
      options: ['idle', 'loading', 'success', 'error'],
      description: '현재 상태 값',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SwitchCase<Status>>;

const caseBy: Partial<Record<Status, React.ReactNode>> = {
  idle: <div className="text-body text-text-gray">대기 중</div>,
  loading: <div className="text-body text-primary-main">로딩 중...</div>,
  success: <div className="text-body text-icon-green">완료</div>,
  error: <div className="text-body text-status-fail">오류 발생</div>,
};

export const Idle: Story = {
  args: {
    value: 'idle',
    caseBy,
    defaultComponent: <div className="text-body text-text-gray">알 수 없는 상태</div>,
  },
};

export const Loading: Story = {
  args: {
    value: 'loading',
    caseBy,
  },
};

export const Success: Story = {
  args: {
    value: 'success',
    caseBy,
  },
};

export const Error: Story = {
  args: {
    value: 'error',
    caseBy,
  },
};

export const DefaultCase: Story = {
  args: {
    value: 'unknown' as Status,
    caseBy,
    defaultComponent: <div className="text-body text-text-gray">매칭되는 케이스 없음</div>,
  },
};
