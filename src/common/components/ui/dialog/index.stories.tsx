import { useState } from 'react';

import { OverlayProvider } from '@/common/lib';

import { Button } from '../button';

import { Dialog } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '다이얼로그 제목',
    },
    closeOnBackdrop: {
      control: 'boolean',
      description: '백드롭 클릭 시 닫기',
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'ESC 키로 닫기',
    },
    lockScroll: {
      control: 'boolean',
      description: '배경 스크롤 잠금',
    },
    trapFocus: {
      control: 'boolean',
      description: '포커스 트랩 사용',
    },
  },
  decorators: [
    (Story) => (
      <OverlayProvider>
        <Story />
      </OverlayProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Options: Story = {
  args: {
    title: '옵션 테스트',
    closeOnBackdrop: true,
    closeOnEscape: true,
    lockScroll: true,
    trapFocus: true,
  },
  render: (args) => <OptionsDemo {...args} />,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          '컨트롤에서 `closeOnBackdrop`, `closeOnEscape`, `lockScroll`, `trapFocus`를 바꿔가며 동작을 확인하는 스토리입니다.',
      },
    },
  },
};

export const OverlayStack: Story = {
  parameters: {
    docs: {
      description: {
        story: '여러 다이얼로그가 열릴 때 스택 순서와 ESC 동작을 확인하는 스토리입니다.',
      },
    },
  },
  render: () => <OverlayStackDemo />,
};

function OptionsDemo({
  title,
  closeOnBackdrop,
  closeOnEscape,
  lockScroll,
  trapFocus,
}: {
  title?: string;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  lockScroll?: boolean;
  trapFocus?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-bg-white flex min-h-[160vh] w-full flex-col items-center justify-start gap-4 px-6 py-8">
      <div className="text-body text-text-gray text-center">
        컨트롤 패널에서 옵션을 바꿔가며 동작을 확인해 주세요.
      </div>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <div className="bg-bg-gray h-[120vh] w-full rounded-lg" />
      <Dialog
        open={open}
        title={title}
        onClose={() => setOpen(false)}
        closeOnBackdrop={closeOnBackdrop}
        closeOnEscape={closeOnEscape}
        lockScroll={lockScroll}
        trapFocus={trapFocus}
      >
        <div className="text-body text-text-gray space-y-2">
          <div>옵션별로 아래 동작을 확인해 주세요.</div>
          <ul className="list-disc space-y-1 pl-5">
            <li>closeOnBackdrop: 배경 클릭 시 다이얼로그가 닫힙니다.</li>
            <li>closeOnEscape: ESC 키 입력 시 다이얼로그가 닫힙니다.</li>
            <li>lockScroll: 다이얼로그가 열리면 배경 스크롤이 잠깁니다.</li>
            <li>trapFocus: 포커스가 다이얼로그 내부에 유지됩니다.</li>
          </ul>
        </div>
        <div className="mt-4 space-y-3">
          <input className="w-full rounded-md border px-3 py-2" placeholder="Input A" />
          <input className="w-full rounded-md border px-3 py-2" placeholder="Input B" />
          <div className="flex justify-end gap-2">
            <Button variant="change" onClick={() => setOpen(false)}>
              확인
            </Button>
            <Button onClick={() => setOpen(false)}>닫기</Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

function OverlayStackDemo() {
  const [firstOpen, setFirstOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);

  return (
    <div className="flex items-center justify-center gap-3">
      <Button onClick={() => setFirstOpen(true)}>Open first</Button>
      <Button onClick={() => setSecondOpen(true)}>Open second</Button>

      <Dialog
        open={firstOpen}
        title="첫 번째 다이얼로그"
        onClose={() => setFirstOpen(false)}
        closeOnBackdrop
      >
        <div className="text-body text-text-gray">
          두 번째 다이얼로그를 열고, 배경 클릭 시 스택 순서를 확인해 보세요.
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="change" onClick={() => setSecondOpen(true)}>
            두 번째 열기
          </Button>
          <Button onClick={() => setFirstOpen(false)}>닫기</Button>
        </div>
      </Dialog>

      <Dialog
        open={secondOpen}
        title="두 번째 다이얼로그"
        onClose={() => setSecondOpen(false)}
        closeOnBackdrop
      >
        <div className="text-body text-text-gray">
          두 다이얼로그가 열렸을 때 스택 순서와 Esc 동작을 확인해 주세요.
        </div>
        <div className="mt-5 flex justify-end">
          <Button onClick={() => setSecondOpen(false)}>닫기</Button>
        </div>
      </Dialog>
    </div>
  );
}
