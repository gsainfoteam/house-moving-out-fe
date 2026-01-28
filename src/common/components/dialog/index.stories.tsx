import { useState } from 'react';

import { OverlayProvider } from '@/common/lib';

import { Button } from '../ui';

import { Dialog } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
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

export const Default: Story = {
  render: () => <DialogDemo />,
};

export const TrapFocus: Story = {
  render: () => <TrapFocusDemo />,
};

export const OverlayStack: Story = {
  render: () => <OverlayStackDemo />,
};

export const LockScroll: Story = {
  render: () => <LockScrollDemo />,
  parameters: {
    layout: 'fullscreen',
  },
};

function DialogDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-center">
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Dialog open={open} title="간단한 다이얼로그" onClose={() => setOpen(false)} closeOnBackdrop>
        <div className="text-body text-text-gray">
          useOverlay 기반으로 만든 간단한 다이얼로그입니다.
        </div>
        <div className="mt-5 flex justify-end">
          <Button onClick={() => setOpen(false)}>닫기</Button>
        </div>
      </Dialog>
    </div>
  );
}

function TrapFocusDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-center">
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Dialog
        open={open}
        title="포커스 트랩 테스트"
        onClose={() => setOpen(false)}
        closeOnBackdrop
        trapFocus
      >
        <div className="text-body text-text-gray">
          Tab/Shift+Tab으로 포커스가 다이얼로그 안에서만 순환되는지 확인해 주세요.
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
          두 다이얼로그가 열렸을 때 z-index와 Esc 동작을 확인해 주세요.
        </div>
        <div className="mt-5 flex justify-end">
          <Button onClick={() => setSecondOpen(false)}>닫기</Button>
        </div>
      </Dialog>
    </div>
  );
}

function LockScrollDemo() {
  const [lockedOpen, setLockedOpen] = useState(false);
  const [unlockedOpen, setUnlockedOpen] = useState(false);

  return (
    <div className="bg-bg-white flex min-h-[160vh] w-full flex-col items-center justify-start gap-4 px-6 py-8">
      <div className="text-body text-text-gray">
        페이지 스크롤을 내려보세요. 다이얼로그가 열릴 때 스크롤이 잠기는지 확인해 주세요.
      </div>
      <div className="flex gap-3">
        <Button onClick={() => setLockedOpen(true)}>Lock scroll</Button>
        <Button onClick={() => setUnlockedOpen(true)}>Unlock scroll</Button>
      </div>
      <div className="bg-bg-gray h-[120vh] w-full rounded-lg" />

      <Dialog
        open={lockedOpen}
        title="스크롤 잠금"
        onClose={() => setLockedOpen(false)}
        closeOnBackdrop
        lockScroll
      >
        <div className="text-body text-text-gray">배경 스크롤이 잠겨야 합니다.</div>
        <div className="mt-5 flex justify-end">
          <Button onClick={() => setLockedOpen(false)}>닫기</Button>
        </div>
      </Dialog>

      <Dialog
        open={unlockedOpen}
        title="스크롤 잠금 해제"
        onClose={() => setUnlockedOpen(false)}
        closeOnBackdrop
        lockScroll={false}
      >
        <div className="text-body text-text-gray">배경 스크롤이 유지되어야 합니다.</div>
        <div className="mt-5 flex justify-end">
          <Button onClick={() => setUnlockedOpen(false)}>닫기</Button>
        </div>
      </Dialog>
    </div>
  );
}
