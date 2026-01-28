import { OverlayProvider } from '@/common/lib';

import { Button } from '../button';

import { Dialog } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

type OptionsArgs = {
  title?: string;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  lockScroll?: boolean;
  trapFocus?: boolean;
};

const meta: Meta<OptionsArgs> = {
  title: 'Components/Dialog',
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
type Story = StoryObj<OptionsArgs>;

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
}: OptionsArgs) {
  return (
    <div className="bg-bg-white flex min-h-[160vh] w-full flex-col items-center justify-start gap-4 px-6 py-8">
      <div className="text-body text-text-gray text-center">
        컨트롤 패널에서 옵션을 바꿔가며 동작을 확인해 주세요.
      </div>
      <Dialog.Root
        closeOnBackdrop={closeOnBackdrop}
        closeOnEscape={closeOnEscape}
        lockScroll={lockScroll}
        trapFocus={trapFocus}
      >
        <Dialog.Trigger asChild>
          <Button>Open dialog</Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Header>
            {title ? <Dialog.Title>{title}</Dialog.Title> : null}
            <Dialog.Description>옵션별로 아래 동작을 확인해 주세요.</Dialog.Description>
          </Dialog.Header>
          <ul className="text-body text-text-gray list-disc space-y-1 pl-5">
            <li>closeOnBackdrop: 배경 클릭 시 다이얼로그가 닫힙니다.</li>
            <li>closeOnEscape: ESC 키 입력 시 다이얼로그가 닫힙니다.</li>
            <li>lockScroll: 다이얼로그가 열리면 배경 스크롤이 잠깁니다.</li>
            <li>trapFocus: 포커스가 다이얼로그 내부에 유지됩니다.</li>
          </ul>
          <div className="mt-4 space-y-3">
            <input className="w-full rounded-md border px-3 py-2" placeholder="Input A" />
            <input className="w-full rounded-md border px-3 py-2" placeholder="Input B" />
            <Dialog.Footer>
              <Dialog.Close asChild>
                <Button variant="change">확인</Button>
              </Dialog.Close>
              <Dialog.Close asChild>
                <Button>닫기</Button>
              </Dialog.Close>
            </Dialog.Footer>
          </div>
        </Dialog.Content>
      </Dialog.Root>
      <div className="bg-bg-gray h-[120vh] w-full rounded-lg" />
    </div>
  );
}

function OverlayStackDemo() {
  // FIXME: 중첩 다이얼로그 작동 안 함

  return (
    <div className="flex items-center justify-center gap-3">
      <Dialog.Root closeOnBackdrop>
        <Dialog.Trigger asChild>
          <Button>Open first</Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>첫 번째 다이얼로그</Dialog.Title>
            <Dialog.Description>
              두 번째 다이얼로그를 열고, 배경 클릭 시 스택 순서를 확인해 보세요.
            </Dialog.Description>
          </Dialog.Header>
          <Dialog.Footer>
            <Dialog.Root closeOnBackdrop>
              <Dialog.Trigger asChild>
                <Button variant="change">두 번째 열기</Button>
              </Dialog.Trigger>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>두 번째 다이얼로그</Dialog.Title>
                  <Dialog.Description>
                    두 다이얼로그가 열렸을 때 스택 순서와 Esc 동작을 확인해 주세요.
                  </Dialog.Description>
                </Dialog.Header>
                <Dialog.Footer>
                  <Dialog.Close asChild>
                    <Button>닫기</Button>
                  </Dialog.Close>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog.Root>
            <Dialog.Close asChild>
              <Button>닫기</Button>
            </Dialog.Close>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}

// TODO: 스크롤, 최대 크기 스토리 추가
