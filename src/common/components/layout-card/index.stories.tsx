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
        <LayoutCard.Content>
          <LayoutCard.Header>
            <LayoutCard.Media>
              <div className="bg-bg-gray text-text-gray flex h-40 w-full items-center justify-center rounded-xl">
                미디어 영역
              </div>
            </LayoutCard.Media>
            <LayoutCard.Text>
              <LayoutCard.Title>레이아웃 카드 제목</LayoutCard.Title>
              <LayoutCard.Description>
                화면 레이아웃용 카드입니다. 미디어, 제목, 설명, 버튼을 담습니다.
              </LayoutCard.Description>
            </LayoutCard.Text>
          </LayoutCard.Header>
        </LayoutCard.Content>
        <LayoutCard.Footer>
          <LayoutCard.Button variant="default">확인</LayoutCard.Button>
        </LayoutCard.Footer>
      </LayoutCard.Root>
    </div>
  ),
};

export const WithDetails: Story = {
  render: () => (
    <div className="h-[560px] w-[360px]">
      <LayoutCard.Root>
        <LayoutCard.Content>
          <LayoutCard.Header>
            <LayoutCard.Media>
              <div className="bg-status-fail/10 text-status-fail flex h-32 w-full items-center justify-center rounded-xl">
                실패 아이콘
              </div>
            </LayoutCard.Media>
            <LayoutCard.Text>
              <LayoutCard.Title className="text-status-fail">검사 미통과</LayoutCard.Title>
              <LayoutCard.Description>
                검사 결과 미통과 사유를 확인해 주세요.
              </LayoutCard.Description>
            </LayoutCard.Text>
          </LayoutCard.Header>
          <LayoutCard.Details>
            <details className="border-logo-gray w-full rounded-lg border p-3">
              <summary className="text-button cursor-pointer">추가 정보</summary>
              <ul className="text-box2 text-text-black mt-2 flex flex-col gap-2">
                <li className="flex items-center gap-2">
                  <span className="bg-status-fail size-1.5 shrink-0 rounded-full" />
                  사유 1
                </li>
                <li className="flex items-center gap-2">
                  <span className="bg-status-fail size-1.5 shrink-0 rounded-full" />
                  사유 2
                </li>
              </ul>
            </details>
          </LayoutCard.Details>
        </LayoutCard.Content>
        <LayoutCard.Footer>
          <LayoutCard.Button variant="failed" className="w-full">
            다시 신청하기
          </LayoutCard.Button>
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
          <LayoutCard.Content className="justify-between">
            <LayoutCard.Header>
              <LayoutCard.Text>
                <LayoutCard.Title>Default 버튼</LayoutCard.Title>
              </LayoutCard.Text>
            </LayoutCard.Header>
          </LayoutCard.Content>
          <LayoutCard.Footer>
            <LayoutCard.Button variant="default">Default</LayoutCard.Button>
          </LayoutCard.Footer>
        </LayoutCard.Root>
      </div>
      <div className="h-[320px] w-[360px]">
        <LayoutCard.Root>
          <LayoutCard.Content className="justify-between">
            <LayoutCard.Header>
              <LayoutCard.Text>
                <LayoutCard.Title>Outline 버튼</LayoutCard.Title>
              </LayoutCard.Text>
            </LayoutCard.Header>
          </LayoutCard.Content>
          <LayoutCard.Footer>
            <LayoutCard.Button variant="outline">Outline</LayoutCard.Button>
          </LayoutCard.Footer>
        </LayoutCard.Root>
      </div>
      <div className="h-[320px] w-[360px]">
        <LayoutCard.Root>
          <LayoutCard.Content className="justify-between">
            <LayoutCard.Header>
              <LayoutCard.Text>
                <LayoutCard.Title>Failed 버튼</LayoutCard.Title>
              </LayoutCard.Text>
            </LayoutCard.Header>
          </LayoutCard.Content>
          <LayoutCard.Footer>
            <LayoutCard.Button variant="failed">Failed</LayoutCard.Button>
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
        <LayoutCard.Content className="justify-between">
          <LayoutCard.Header>
            <LayoutCard.Text>
              <LayoutCard.Title>최소 구성</LayoutCard.Title>
              <LayoutCard.Description>Content + Footer만 사용한 예시입니다.</LayoutCard.Description>
            </LayoutCard.Text>
          </LayoutCard.Header>
        </LayoutCard.Content>
        <LayoutCard.Footer>
          <LayoutCard.Button variant="outline">다음</LayoutCard.Button>
        </LayoutCard.Footer>
      </LayoutCard.Root>
    </div>
  ),
};
