import { OverlayProvider } from '@/common/lib';

import { Button } from '../button';

import { Drawer } from '.';

import type { DrawerSide } from './context';
import type { Meta, StoryObj } from '@storybook/react-vite';

type OptionsArgs = {
  side?: DrawerSide;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  lockScroll?: boolean;
  trapFocus?: boolean;
};

const meta: Meta<OptionsArgs> = {
  title: 'Overlay/Drawer',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    side: {
      control: 'radio',
      options: ['top', 'right', 'bottom', 'left'],
      description: '드로어가 열리는 방향',
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
    side: 'bottom',
    closeOnBackdrop: true,
    closeOnEscape: true,
    lockScroll: true,
    trapFocus: true,
  },
  render: (args) => <OptionsDemo {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          'side 및 overlay 옵션(closeOnBackdrop, closeOnEscape, lockScroll, trapFocus)을 바꿔가며 드로어 동작을 확인하는 스토리입니다.',
      },
    },
  },
};

export const Sides: Story = {
  args: {
    closeOnBackdrop: true,
  },
  render: (args) => <SidesDemo {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          '상(top) / 하(bottom) / 좌(left) / 우(right)에서 열리는 드로어를 각각 확인하는 스토리입니다.',
      },
    },
  },
};

export const Nested: Story = {
  args: {
    closeOnBackdrop: true,
  },
  render: (args) => <NestedDemo {...args} />,
  parameters: {
    docs: {
      description: {
        story: '드로어 안에서 또 다른 드로어를 여는 중첩 드로어 동작을 확인하는 스토리입니다.',
      },
    },
  },
};

export const LongText: Story = {
  args: {
    closeOnBackdrop: true,
  },
  render: (args) => <LongTextDemo {...args} />,
  parameters: {
    docs: {
      description: {
        story: '콘텐츠가 길어질 때 드로어 내부 스크롤과 레이아웃을 확인하는 스토리입니다.',
      },
    },
  },
};

function OptionsDemo({
  side = 'bottom',
  closeOnBackdrop,
  closeOnEscape,
  lockScroll,
  trapFocus,
}: OptionsArgs) {
  return (
    <div className="bg-bg-white flex min-h-[160vh] w-full flex-col items-center justify-start gap-4 px-6 py-8">
      <div className="text-body text-text-gray text-center">
        컨트롤 패널에서 방향과 옵션을 바꿔가며 드로어 동작을 확인해 주세요.
      </div>
      <Drawer.Root
        side={side}
        closeOnBackdrop={closeOnBackdrop}
        closeOnEscape={closeOnEscape}
        lockScroll={lockScroll}
        trapFocus={trapFocus}
      >
        <Drawer.Trigger asChild>
          <Button>Open drawer</Button>
        </Drawer.Trigger>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>드로어 옵션 테스트</Drawer.Title>
            <Drawer.Description>방향과 옵션별로 아래 동작을 확인해 주세요.</Drawer.Description>
          </Drawer.Header>
          <Drawer.Body className="space-y-3">
            <ul className="text-body text-text-gray list-disc space-y-1 pl-5">
              <li>side: 드로어가 열리는 방향을 지정합니다.</li>
              <li>closeOnBackdrop: 배경 클릭 시 드로어가 닫힙니다.</li>
              <li>closeOnEscape: ESC 키 입력 시 드로어가 닫힙니다.</li>
              <li>lockScroll: 드로어가 열리면 배경 스크롤이 잠깁니다.</li>
              <li>trapFocus: 포커스가 드로어 내부에 유지됩니다.</li>
            </ul>
            <div className="mt-4 space-y-3">
              <input className="w-full rounded-md border px-3 py-2" placeholder="Input A" />
              <input className="w-full rounded-md border px-3 py-2" placeholder="Input B" />
            </div>
          </Drawer.Body>
          <Drawer.Footer>
            <Drawer.Close asChild>
              <Button variant="outline">확인</Button>
            </Drawer.Close>
            <Drawer.Close asChild>
              <Button>닫기</Button>
            </Drawer.Close>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Root>
      <div className="bg-bg-gray h-[120vh] w-full rounded-lg" />
    </div>
  );
}

function SidesDemo({ closeOnBackdrop, closeOnEscape, lockScroll, trapFocus }: OptionsArgs) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6">
      <div className="grid h-[220px] w-full max-w-md grid-cols-3 grid-rows-3 items-center justify-items-center gap-4">
        <div className="col-start-2 row-start-1">
          <Drawer.Root
            side="top"
            closeOnBackdrop={closeOnBackdrop}
            closeOnEscape={closeOnEscape}
            lockScroll={lockScroll}
            trapFocus={trapFocus}
          >
            <Drawer.Trigger asChild>
              <Button variant="outline">Top</Button>
            </Drawer.Trigger>
            <Drawer.Content>
              <Drawer.Header>
                <Drawer.Title>Top drawer</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>
                <p className="text-body text-text-gray text-center">
                  상단에서 열리는 드로어입니다. ESC 및 백드롭 동작을 확인해 주세요.
                </p>
              </Drawer.Body>
              <Drawer.Footer>
                <Drawer.Close asChild>
                  <Button>닫기</Button>
                </Drawer.Close>
              </Drawer.Footer>
            </Drawer.Content>
          </Drawer.Root>
        </div>

        <div className="col-start-2 row-start-3">
          <Drawer.Root
            side="bottom"
            closeOnBackdrop={closeOnBackdrop}
            closeOnEscape={closeOnEscape}
            lockScroll={lockScroll}
            trapFocus={trapFocus}
          >
            <Drawer.Trigger asChild>
              <Button>Bottom</Button>
            </Drawer.Trigger>
            <Drawer.Content>
              <Drawer.Header>
                <Drawer.Title>Bottom drawer</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>
                <p className="text-body text-text-gray text-center">
                  하단에서 올라오는 바텀 시트 형태의 드로어입니다.
                </p>
              </Drawer.Body>
              <Drawer.Footer>
                <Drawer.Close asChild>
                  <Button>닫기</Button>
                </Drawer.Close>
              </Drawer.Footer>
            </Drawer.Content>
          </Drawer.Root>
        </div>

        <div className="col-start-1 row-start-2">
          <Drawer.Root
            side="left"
            closeOnBackdrop={closeOnBackdrop}
            closeOnEscape={closeOnEscape}
            lockScroll={lockScroll}
            trapFocus={trapFocus}
          >
            <Drawer.Trigger asChild>
              <Button>Left</Button>
            </Drawer.Trigger>
            <Drawer.Content>
              <Drawer.Header>
                <Drawer.Title>Left drawer</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>
                <p className="text-body text-text-gray text-center">
                  좌측에서 슬라이드 인 되는 드로어입니다.
                </p>
              </Drawer.Body>
              <Drawer.Footer>
                <Drawer.Close asChild>
                  <Button>닫기</Button>
                </Drawer.Close>
              </Drawer.Footer>
            </Drawer.Content>
          </Drawer.Root>
        </div>

        <div className="col-start-3 row-start-2">
          <Drawer.Root
            side="right"
            closeOnBackdrop={closeOnBackdrop}
            closeOnEscape={closeOnEscape}
            lockScroll={lockScroll}
            trapFocus={trapFocus}
          >
            <Drawer.Trigger asChild>
              <Button>Right</Button>
            </Drawer.Trigger>
            <Drawer.Content>
              <Drawer.Header>
                <Drawer.Title>Right drawer</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>
                <p className="text-body text-text-gray text-center">
                  우측에서 슬라이드 인 되는 드로어입니다.
                </p>
              </Drawer.Body>
              <Drawer.Footer>
                <Drawer.Close asChild>
                  <Button>닫기</Button>
                </Drawer.Close>
              </Drawer.Footer>
            </Drawer.Content>
          </Drawer.Root>
        </div>
      </div>
    </div>
  );
}

function NestedDemo({ closeOnBackdrop, closeOnEscape, lockScroll, trapFocus }: OptionsArgs) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Drawer.Root
        side="right"
        closeOnBackdrop={closeOnBackdrop}
        closeOnEscape={closeOnEscape}
        lockScroll={lockScroll}
        trapFocus={trapFocus}
      >
        <Drawer.Trigger asChild>
          <Button>Open outer drawer</Button>
        </Drawer.Trigger>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title className="text-center font-semibold">Outer drawer</Drawer.Title>
            <Drawer.Description>
              안쪽 드로어를 열고, ESC / 백드롭 동작과 포커스 이동을 확인해 보세요.
            </Drawer.Description>
          </Drawer.Header>
          <Drawer.Body className="space-y-3">
            <p className="text-body text-text-gray">
              바깥 드로어는 오른쪽에서 열립니다. 아래 버튼을 눌러 안쪽 드로어를 열 수 있습니다.
            </p>
          </Drawer.Body>
          <Drawer.Footer>
            <Drawer.Root
              side="left"
              closeOnBackdrop={closeOnBackdrop}
              closeOnEscape={closeOnEscape}
              lockScroll={lockScroll}
              trapFocus={trapFocus}
            >
              <Drawer.Trigger asChild>
                <Button variant="outline" className="w-full">
                  드로어 열기
                </Button>
              </Drawer.Trigger>
              <Drawer.Content className="max-w-xs">
                <Drawer.Header>
                  <Drawer.Title className="text-center font-semibold">Inner drawer</Drawer.Title>
                  <Drawer.Description>
                    이 드로어가 열려 있을 때 ESC 및 백드롭이 안쪽 드로어부터 먼저 닫히는지 확인해
                    주세요.
                  </Drawer.Description>
                </Drawer.Header>
                <Drawer.Body className="space-y-2">
                  <p className="text-body text-text-gray text-center">
                    overlay 스택이 제대로 동작하면, 안쪽 드로어가 항상 최상단에 위치합니다.
                  </p>
                </Drawer.Body>
                <Drawer.Footer>
                  <Drawer.Close asChild>
                    <Button>안쪽 닫기</Button>
                  </Drawer.Close>
                </Drawer.Footer>
              </Drawer.Content>
            </Drawer.Root>
            <Drawer.Close asChild>
              <Button>바깥 닫기</Button>
            </Drawer.Close>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Root>
    </div>
  );
}

function LongTextDemo({ closeOnBackdrop, closeOnEscape, lockScroll, trapFocus }: OptionsArgs) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Drawer.Root
        side="bottom"
        closeOnBackdrop={closeOnBackdrop}
        closeOnEscape={closeOnEscape}
        lockScroll={lockScroll}
        trapFocus={trapFocus}
      >
        <Drawer.Trigger asChild>
          <Button>Open long text drawer</Button>
        </Drawer.Trigger>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title className="text-center font-semibold">긴 내용 드로어</Drawer.Title>
            <Drawer.Description>
              아래 스크롤을 내려가며 내부 스크롤이 자연스러운지 확인해 주세요.
            </Drawer.Description>
          </Drawer.Header>
          <Drawer.Body>
            {Array.from({ length: 12 }).map((_, index) => (
              <p key={index} className="mb-4 leading-normal">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </p>
            ))}
          </Drawer.Body>
          <Drawer.Footer>
            <Drawer.Close asChild>
              <Button>닫기</Button>
            </Drawer.Close>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Root>
    </div>
  );
}
