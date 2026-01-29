import { OverlayProvider } from '@/common/lib';

import { Button } from './button';
import { Dialog } from './dialog';
import { Drawer } from './drawer';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta = {
  title: 'Overlay',
  parameters: {
    layout: 'fullscreen',
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
type Story = StoryObj;

export const DialogInDrawer: Story = {
  parameters: {
    docs: {
      description: {
        story: '드로어 안에서 다이얼로그를 열 때의 동작을 확인하는 스토리입니다.',
      },
    },
  },
  render: () => <DialogInDrawerDemo />,
};

export const DrawerInDialog: Story = {
  parameters: {
    docs: {
      description: {
        story: '다이얼로그 안에서 드로어를 열 때의 동작을 확인하는 스토리입니다.',
      },
    },
  },
  render: () => <DrawerInDialogDemo />,
};

export const ComplexStack: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '다이얼로그와 드로어가 복잡하게 섞여 있을 때 스택 순서, ESC 동작, 포커스 트랩을 확인하는 스토리입니다.',
      },
    },
  },
  render: () => <ComplexStackDemo />,
};

function DialogInDrawerDemo() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Drawer.Root side="bottom" closeOnBackdrop>
        <Drawer.Trigger asChild>
          <Button>Open drawer</Button>
        </Drawer.Trigger>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title className="text-center font-semibold">Drawer with Dialog</Drawer.Title>
            <Drawer.Description>
              아래 버튼을 눌러 드로어 안에서 다이얼로그를 열어보세요.
            </Drawer.Description>
          </Drawer.Header>
          <Drawer.Body>
            <p className="text-body text-text-gray">
              드로어가 열린 상태에서 다이얼로그를 열면, 다이얼로그가 최상단에 표시됩니다.
            </p>
          </Drawer.Body>
          <Drawer.Footer orientation="vertical">
            <Dialog.Root closeOnBackdrop>
              <Dialog.Trigger asChild>
                <Button variant="outline">Open dialog inside drawer</Button>
              </Dialog.Trigger>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>Dialog inside Drawer</Dialog.Title>
                  <Dialog.Description>
                    이 다이얼로그는 드로어 안에서 열렸습니다. ESC를 누르면 이 다이얼로그가 먼저
                    닫히고, 다시 ESC를 누르면 드로어가 닫힙니다.
                  </Dialog.Description>
                </Dialog.Header>
                <Dialog.Body>
                  <p className="text-body text-text-gray">
                    overlay 스택이 제대로 동작하면, 가장 최근에 연 오버레이가 항상 최상단에
                    위치합니다.
                  </p>
                </Dialog.Body>
                <Dialog.Footer orientation="vertical">
                  <Dialog.Close asChild>
                    <Button>닫기</Button>
                  </Dialog.Close>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog.Root>
            <Drawer.Close asChild>
              <Button>드로어 닫기</Button>
            </Drawer.Close>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Root>
    </div>
  );
}

function DrawerInDialogDemo() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Dialog.Root closeOnBackdrop>
        <Dialog.Trigger asChild>
          <Button>Open dialog</Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Dialog with Drawer</Dialog.Title>
            <Dialog.Description>
              아래 버튼을 눌러 다이얼로그 안에서 드로어를 열어보세요.
            </Dialog.Description>
          </Dialog.Header>
          <Dialog.Body>
            <p className="text-body text-text-gray">
              다이얼로그가 열린 상태에서 드로어를 열면, 드로어가 최상단에 표시됩니다.
            </p>
          </Dialog.Body>
          <Dialog.Footer orientation="vertical">
            <Drawer.Root side="right" closeOnBackdrop>
              <Drawer.Trigger asChild>
                <Button variant="outline">Open drawer inside dialog</Button>
              </Drawer.Trigger>
              <Drawer.Content>
                <Drawer.Header>
                  <Drawer.Title className="text-center font-semibold">
                    Drawer inside Dialog
                  </Drawer.Title>
                  <Drawer.Description>
                    이 드로어는 다이얼로그 안에서 열렸습니다. ESC를 누르면 이 드로어가 먼저 닫히고,
                    다시 ESC를 누르면 다이얼로그가 닫힙니다.
                  </Drawer.Description>
                </Drawer.Header>
                <Drawer.Body>
                  <p className="text-body text-text-gray text-center">
                    overlay 스택이 제대로 동작하면, 가장 최근에 연 오버레이가 항상 최상단에
                    위치합니다.
                  </p>
                </Drawer.Body>
                <Drawer.Footer orientation="vertical">
                  <Drawer.Close asChild>
                    <Button>닫기</Button>
                  </Drawer.Close>
                </Drawer.Footer>
              </Drawer.Content>
            </Drawer.Root>
            <Dialog.Close asChild>
              <Button>다이얼로그 닫기</Button>
            </Dialog.Close>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}

function ComplexStackDemo() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Dialog.Root closeOnBackdrop>
        <Dialog.Trigger asChild>
          <Button>1. Open first dialog</Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>First Dialog</Dialog.Title>
            <Dialog.Description>
              여러 오버레이를 순서대로 열어보며 스택 동작을 확인해 주세요.
            </Dialog.Description>
          </Dialog.Header>
          <Dialog.Body>
            <p className="text-body text-text-gray">
              첫 번째 다이얼로그입니다. 아래 버튼들을 눌러 다른 오버레이들을 순서대로 열어보세요.
            </p>
          </Dialog.Body>
          <Dialog.Footer orientation="vertical">
            <Drawer.Root side="bottom" closeOnBackdrop>
              <Drawer.Trigger asChild>
                <Button variant="outline">2. Open drawer</Button>
              </Drawer.Trigger>
              <Drawer.Content>
                <Drawer.Header>
                  <Drawer.Title className="text-center font-semibold">Drawer</Drawer.Title>
                  <Drawer.Description>
                    두 번째로 열린 오버레이입니다. 아래 버튼을 눌러 세 번째 오버레이를 열어보세요.
                  </Drawer.Description>
                </Drawer.Header>
                <Drawer.Body>
                  <p className="text-body text-text-gray">
                    드로어가 열린 상태입니다. 아래 버튼을 눌러 세 번째 오버레이를 열어보세요.
                  </p>
                </Drawer.Body>
                <Drawer.Footer orientation="vertical">
                  <Dialog.Root closeOnBackdrop>
                    <Dialog.Trigger asChild>
                      <Button variant="outline">3. Open second dialog</Button>
                    </Dialog.Trigger>
                    <Dialog.Content className="w-80">
                      <Dialog.Header>
                        <Dialog.Title>Second Dialog</Dialog.Title>
                        <Dialog.Description>
                          세 번째로 열린 오버레이입니다. ESC를 누르면 이 다이얼로그가 먼저 닫힙니다.
                        </Dialog.Description>
                      </Dialog.Header>
                      <Dialog.Body>
                        <p className="text-body text-text-gray">
                          오버레이 스택 순서: 1. First Dialog → 2. Drawer → 3. Second Dialog
                          (최상단)
                        </p>
                      </Dialog.Body>
                      <Dialog.Footer orientation="vertical">
                        <Dialog.Close asChild>
                          <Button>닫기 (3)</Button>
                        </Dialog.Close>
                      </Dialog.Footer>
                    </Dialog.Content>
                  </Dialog.Root>
                  <Drawer.Close asChild>
                    <Button>닫기 (2)</Button>
                  </Drawer.Close>
                </Drawer.Footer>
              </Drawer.Content>
            </Drawer.Root>
            <Dialog.Close asChild>
              <Button>닫기 (1)</Button>
            </Dialog.Close>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}
