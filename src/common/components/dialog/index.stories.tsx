import { I18nextProvider, useTranslation } from 'react-i18next';

import ModalBang from '@/assets/modal-bang.svg?react';
import ModalCheck from '@/assets/modal-check.svg?react';
import ModalX from '@/assets/modal-x.svg?react';
import { i18n, OverlayHost, overlay, OverlayProvider } from '@/common/lib';

import { Button } from '../ui';

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
  title: 'Common/Dialog',
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
      <I18nextProvider i18n={i18n}>
        <OverlayProvider>
          <OverlayHost />
          <Story />
        </OverlayProvider>
      </I18nextProvider>
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

export const Scroll: Story = {
  parameters: {
    docs: {
      description: {
        story: '콘텐츠가 길어질 때 다이얼로그 내부 스크롤을 확인하는 스토리입니다.',
      },
    },
  },
  render: () => <ScrollDemo />,
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
      <Button
        onClick={() =>
          overlay.open(() => (
            <Dialog.Root
              closeOnBackdrop={closeOnBackdrop}
              closeOnEscape={closeOnEscape}
              lockScroll={lockScroll}
              trapFocus={trapFocus}
            >
              <Dialog.Header>
                {title ? <Dialog.Title>{title}</Dialog.Title> : null}
                <Dialog.Description>옵션별로 아래 동작을 확인해 주세요.</Dialog.Description>
              </Dialog.Header>
              <Dialog.Body className="space-y-3">
                <ul className="text-body text-text-gray list-disc space-y-1 pl-5">
                  <li>closeOnBackdrop: 배경 클릭 시 다이얼로그가 닫힙니다.</li>
                  <li>closeOnEscape: ESC 키 입력 시 다이얼로그가 닫힙니다.</li>
                  <li>lockScroll: 다이얼로그가 열리면 배경 스크롤이 잠깁니다.</li>
                  <li>trapFocus: 포커스가 다이얼로그 내부에 유지됩니다.</li>
                </ul>
                <div className="mt-4 space-y-3">
                  <input className="w-full rounded-md border px-3 py-2" placeholder="Input A" />
                  <input className="w-full rounded-md border px-3 py-2" placeholder="Input B" />
                </div>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.Close asChild>
                  <Button variant="outline">확인</Button>
                </Dialog.Close>
                <Dialog.Close asChild>
                  <Button>닫기</Button>
                </Dialog.Close>
              </Dialog.Footer>
            </Dialog.Root>
          ))
        }
      >
        Open dialog
      </Button>
      <div className="bg-bg-gray h-[120vh] w-full rounded-lg" />
    </div>
  );
}

function OverlayStackDemo() {
  return (
    <div className="flex items-center justify-center gap-3">
      <Button
        onClick={() =>
          overlay.open(() => (
            <Dialog.Root closeOnBackdrop>
              <Dialog.Header>
                <Dialog.Title>첫 번째 다이얼로그</Dialog.Title>
                <Dialog.Description>
                  두 번째 다이얼로그를 열고, 배경 클릭 시 스택 순서를 확인해 보세요.
                </Dialog.Description>
              </Dialog.Header>
              <Dialog.Footer>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    overlay.open(() => (
                      <Dialog.Root closeOnBackdrop className="w-60">
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
                      </Dialog.Root>
                    ))
                  }
                >
                  두 번째 열기
                </Button>
                <Dialog.Close asChild>
                  <Button>닫기</Button>
                </Dialog.Close>
              </Dialog.Footer>
            </Dialog.Root>
          ))
        }
      >
        첫 번째 열기
      </Button>
    </div>
  );
}

function ScrollDemo() {
  const { t } = useTranslation('user');

  return (
    <div className="flex items-center justify-center">
      <Button
        onClick={() =>
          overlay.open(() => (
            <Dialog.Root closeOnBackdrop>
              <Dialog.Header>
                <Dialog.Title>스크롤 확인</Dialog.Title>
                <Dialog.Description>
                  길어지는 내용이 있을 때 내부 스크롤을 확인해 주세요.
                </Dialog.Description>
              </Dialog.Header>
              <Dialog.Body>
                <ol className="list-decimal space-y-2 pl-5">
                  {Object.values(t('application.dialog.notice.items', { returnObjects: true })).map(
                    (item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ),
                  )}
                </ol>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.Close asChild>
                  <Button>닫기</Button>
                </Dialog.Close>
              </Dialog.Footer>
            </Dialog.Root>
          ))
        }
      >
        Open scroll dialog
      </Button>
    </div>
  );
}

export const InspectionCancellation: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '퇴사 검사 취소 다이얼로그 (nested dialog 패턴)를 확인하는 스토리입니다. 취소하기 버튼을 누르면 취소 완료 다이얼로그가 나타납니다.',
      },
    },
  },
  render: () => <InspectionCancellationDemo />,
};

export const ApplicationDialogs: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '퇴사 검사 신청/수정 관련 다이얼로그들 (성공/마감/쿨다운/수정완료)을 확인하는 스토리입니다.',
      },
    },
  },
  render: () => <ApplicationDialogsDemo />,
};

function InspectionCancellationDemo() {
  const { t } = useTranslation('user');

  return (
    <div className="flex items-center justify-center gap-4">
      <Button
        variant="failed-outline"
        onClick={() =>
          overlay.open(({ close }) => (
            <Dialog.Root>
              <Dialog.Header>
                <ModalBang className="mb-3" />
                <Dialog.Title>{t('steps.waiting.cancel.title')}</Dialog.Title>
                <Dialog.Description>{t('steps.waiting.cancel.description')}</Dialog.Description>
              </Dialog.Header>
              <Dialog.Footer>
                <Dialog.Close asChild>
                  <Button variant="failed-outline" className="w-full">
                    {t('steps.waiting.cancel.button.cancel')}
                  </Button>
                </Dialog.Close>
                <Button
                  variant="failed"
                  className="w-full"
                  onClick={() => {
                    close();
                    overlay.open(() => (
                      <Dialog.Root>
                        <Dialog.Header>
                          <ModalBang className="mb-3" />
                          <Dialog.Title>{t('steps.waiting.cancelled.title')}</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Footer>
                          <Dialog.Close asChild>
                            <Button variant="failed" className="w-full">
                              {t('steps.waiting.cancelled.button')}
                            </Button>
                          </Dialog.Close>
                        </Dialog.Footer>
                      </Dialog.Root>
                    ));
                  }}
                >
                  {t('steps.waiting.cancel.button.submit')}
                </Button>
              </Dialog.Footer>
            </Dialog.Root>
          ))
        }
      >
        취소 확인 (선언적)
      </Button>
    </div>
  );
}

function ApplicationDialogsDemo() {
  const { t } = useTranslation('user');

  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Button
        onClick={() =>
          overlay.open(() => (
            <Dialog.Root>
              <Dialog.Header>
                <ModalCheck className="mb-3" />
                <Dialog.Title>{t('application.dialog.success.title')}</Dialog.Title>
              </Dialog.Header>
              <Dialog.Footer>
                <Dialog.Close asChild>
                  <Button variant="default" className="w-full">
                    {t('application.dialog.success.button')}
                  </Button>
                </Dialog.Close>
              </Dialog.Footer>
            </Dialog.Root>
          ))
        }
      >
        신청 완료
      </Button>

      <Button
        variant="failed"
        onClick={() =>
          overlay.open(() => (
            <Dialog.Root>
              <Dialog.Header>
                <ModalX className="mb-3" />
                <Dialog.Title>{t('application.dialog.full.title')}</Dialog.Title>
              </Dialog.Header>
              <Dialog.Footer>
                <Dialog.Close asChild>
                  <Button variant="failed" className="w-full">
                    {t('application.dialog.full.button')}
                  </Button>
                </Dialog.Close>
              </Dialog.Footer>
            </Dialog.Root>
          ))
        }
      >
        시간대 마감
      </Button>

      <Button
        onClick={() =>
          overlay.open(() => (
            <Dialog.Root>
              <Dialog.Header>
                <ModalCheck className="mb-3" />
                <Dialog.Title>{t('application.dialog.update.title')}</Dialog.Title>
              </Dialog.Header>
              <Dialog.Footer>
                <Dialog.Close asChild>
                  <Button variant="default" className="w-full">
                    {t('application.dialog.update.button')}
                  </Button>
                </Dialog.Close>
              </Dialog.Footer>
            </Dialog.Root>
          ))
        }
      >
        수정 완료
      </Button>

      <Button
        variant="failed-outline"
        onClick={() =>
          overlay.open(() => (
            <Dialog.Root>
              <Dialog.Header>
                <ModalBang className="mb-3" />
                <Dialog.Title>{t('application.dialog.modifyCooldown.title')}</Dialog.Title>
              </Dialog.Header>
              <Dialog.Footer>
                <Dialog.Close asChild>
                  <Button variant="failed" className="w-full">
                    {t('application.dialog.modifyCooldown.button')}
                  </Button>
                </Dialog.Close>
              </Dialog.Footer>
            </Dialog.Root>
          ))
        }
      >
        수정 쿨다운
      </Button>

      <Button
        variant="outline"
        onClick={() =>
          overlay.open(() => (
            <Dialog.Root>
              <Dialog.Header>
                <Dialog.Title>{t('application.dialog.notice.title')}</Dialog.Title>
                <Dialog.Description>
                  {t('application.dialog.notice.description')}
                </Dialog.Description>
              </Dialog.Header>
              <Dialog.Body>
                {Array.from({ length: 10 }).map((_, index) => (
                  <p key={index} className="mb-4 leading-normal">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                ))}
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.Close asChild>
                  <Button variant="default">{t('application.dialog.notice.button')}</Button>
                </Dialog.Close>
              </Dialog.Footer>
            </Dialog.Root>
          ))
        }
      >
        주의사항 확인
      </Button>
    </div>
  );
}
