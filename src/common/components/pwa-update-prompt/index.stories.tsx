import { useEffect, useRef, useState } from 'react';

import { overlay } from '@/common/lib';

import { Button } from '../ui';

import { UpdateDialog } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta = {
  title: 'Common/PwaUpdatePrompt',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Dialog: Story = {
  parameters: {
    docs: {
      description: {
        story: '업데이트 다이얼로그 UI를 직접 확인합니다.',
      },
    },
  },
  render: () => (
    <Button
      onClick={() =>
        overlay.open(() => (
          <UpdateDialog
            updateServiceWorker={() => {
              alert('updateServiceWorker() called — 실제 환경에서는 페이지가 리로드됩니다.');
              return Promise.resolve();
            }}
            onDismiss={() => alert('onDismiss() called')}
          />
        ))
      }
    >
      다이얼로그 열기
    </Button>
  ),
};

function MockPwaUpdatePrompt() {
  const [needRefresh, setNeedRefresh] = useState(false);

  const updateRef = useRef(() => {
    alert('updateServiceWorker() called — 실제 환경에서는 페이지가 리로드됩니다.');
    return Promise.resolve();
  });

  useEffect(() => {
    if (!needRefresh) return;

    overlay.open(() => (
      <UpdateDialog
        updateServiceWorker={() => updateRef.current()}
        onDismiss={() => setNeedRefresh(false)}
      />
    ));
  }, [needRefresh, setNeedRefresh]);

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-body text-text-secondary">
        needRefresh: <strong>{String(needRefresh)}</strong>
      </p>
      <Button onClick={() => setNeedRefresh(true)}>새 버전 감지 시뮬레이션</Button>
    </div>
  );
}

export const Simulation: Story = {
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          '버튼을 눌러 새 버전 감지를 시뮬레이션합니다. 업데이트 시 needRefresh가 true가 되어 다이얼로그가 열리고, 나중에를 누르면 false로 초기화됩니다.',
      },
    },
  },
  render: () => (
    <div className="flex min-h-screen items-center justify-center">
      <MockPwaUpdatePrompt />
    </div>
  ),
};
