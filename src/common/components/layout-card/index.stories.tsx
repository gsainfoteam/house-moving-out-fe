import { Button } from '../ui/button';

import { LayoutCard } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof LayoutCard.Root> = {
  title: 'Components/LayoutCard',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LayoutCard.Root>;

export const Default: Story = {
  render: () => (
    <div className="h-[480px] w-[360px]">
      <LayoutCard.Root>
        <LayoutCard.Center>
          <LayoutCard.Header>
            <LayoutCard.Media>
              <div className="bg-primary-main/10 text-primary-main flex h-40 w-full items-center justify-center rounded-xl">
                검사 통과 일러스트
              </div>
            </LayoutCard.Media>
            <LayoutCard.Text>
              <LayoutCard.Title className="text-primary-main">검사 통과</LayoutCard.Title>
              <LayoutCard.Description>
                점검이 모두 완료되었어요. 다음 단계로 이동해 주세요.
              </LayoutCard.Description>
            </LayoutCard.Text>
          </LayoutCard.Header>
        </LayoutCard.Center>
        <LayoutCard.Footer>
          <Button variant="default" size="full">
            다음 단계로 이동
          </Button>
        </LayoutCard.Footer>
      </LayoutCard.Root>
    </div>
  ),
};

export const WithDetails: Story = {
  render: () => (
    <div className="h-[560px] w-[360px]">
      <LayoutCard.Root>
        <LayoutCard.Header>
          <LayoutCard.Media>
            <div className="bg-status-fail/10 text-status-fail flex h-32 w-full items-center justify-center rounded-xl">
              검사 미통과 아이콘
            </div>
          </LayoutCard.Media>
          <LayoutCard.Text>
            <LayoutCard.Title className="text-status-fail">검사 미통과</LayoutCard.Title>
            <LayoutCard.Description>
              검사 결과 미통과 사유를 확인하고, 다시 신청해 주세요.
            </LayoutCard.Description>
          </LayoutCard.Text>
        </LayoutCard.Header>
        <LayoutCard.Body>
          <details className="border-logo-gray w-full rounded-lg border p-3">
            <summary className="text-button cursor-pointer">추가 정보</summary>
            <ul className="text-box2 text-text-black mt-2 flex flex-col gap-2">
              <li className="flex items-center gap-2">
                <span className="bg-status-fail size-1.5 shrink-0 rounded-full" />
                책상 서랍 정리가 필요해요.
              </li>
              <li className="flex items-center gap-2">
                <span className="bg-status-fail size-1.5 shrink-0 rounded-full" />
                욕실 청소 상태를 다시 확인해 주세요.
              </li>
            </ul>
          </details>
        </LayoutCard.Body>
        <LayoutCard.Footer>
          <Button variant="failed" size="full">
            다시 신청하기
          </Button>
        </LayoutCard.Footer>
      </LayoutCard.Root>
    </div>
  ),
};

export const ButtonVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="h-[320px] w-[360px]">
        <LayoutCard.Root>
          <LayoutCard.Header>
            <LayoutCard.Text>
              <LayoutCard.Title>Default 버튼</LayoutCard.Title>
            </LayoutCard.Text>
          </LayoutCard.Header>
          <LayoutCard.Footer>
            <Button variant="default" size="full">
              Default
            </Button>
          </LayoutCard.Footer>
        </LayoutCard.Root>
      </div>
      <div className="h-[320px] w-[360px]">
        <LayoutCard.Root>
          <LayoutCard.Header>
            <LayoutCard.Text>
              <LayoutCard.Title>Outline 버튼</LayoutCard.Title>
            </LayoutCard.Text>
          </LayoutCard.Header>
          <LayoutCard.Footer>
            <Button variant="outline" size="full">
              Outline
            </Button>
          </LayoutCard.Footer>
        </LayoutCard.Root>
      </div>
      <div className="h-[320px] w-[360px]">
        <LayoutCard.Root>
          <LayoutCard.Header>
            <LayoutCard.Text>
              <LayoutCard.Title>Failed 버튼</LayoutCard.Title>
            </LayoutCard.Text>
          </LayoutCard.Header>
          <LayoutCard.Footer>
            <Button variant="failed" size="full">
              Failed
            </Button>
          </LayoutCard.Footer>
        </LayoutCard.Root>
      </div>
    </div>
  ),
};

export const Minimal: Story = {
  render: () => (
    <div className="h-[240px] w-[360px]">
      <LayoutCard.Root>
        <LayoutCard.Header>
          <LayoutCard.Text>
            <LayoutCard.Title>지금은 신청 기간이 아니에요</LayoutCard.Title>
            <LayoutCard.Description>
              신청 시작일이 되면 다시 안내해 드릴게요.
            </LayoutCard.Description>
          </LayoutCard.Text>
        </LayoutCard.Header>
        <LayoutCard.Footer>
          <Button variant="outline" size="full">
            메인으로 돌아가기
          </Button>
        </LayoutCard.Footer>
      </LayoutCard.Root>
    </div>
  ),
};
