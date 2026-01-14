import type { Meta, StoryObj } from '@storybook/react-vite';

import { Steps } from '.';

const mockSteps: Steps.Step[] = [
  {
    title: '검사 신청',
    description: '하단의 버튼을 통해 퇴사 검사를 신청해주세요.',
  },
  {
    title: '검사 대기',
    description: '퇴사 검사가 01/12(월) 00시에 예정되어 있습니다.',
  },
  {
    title: '검사 중',
    description:
      '퇴사 검사 진행 중입니다.\n잠시 뒤에 검사 결과를 확인해주세요.',
  },
  {
    title: '검사 결과',
  },
];

const meta: Meta<typeof Steps> = {
  title: 'Components/Steps',
  component: Steps,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    activeStepIndex: {
      control: { type: 'number', min: 0, max: 3 },
      description: '현재 활성화된 단계의 인덱스 (0부터 시작)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Steps>;

export const Playground: Story = {
  args: {
    steps: mockSteps,
    activeStepIndex: 0,
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-12">
      <div>
        <h3 className="text-h2 mb-4 font-bold">Step 1 Active</h3>
        <Steps steps={mockSteps} activeStepIndex={0} />
      </div>
      <div>
        <h3 className="text-h2 mb-4 font-bold">Step 2 Active</h3>
        <Steps steps={mockSteps} activeStepIndex={1} />
      </div>
      <div>
        <h3 className="text-h2 mb-4 font-bold">Step 3 Active</h3>
        <Steps steps={mockSteps} activeStepIndex={2} />
      </div>
      <div>
        <h3 className="text-h2 mb-4 font-bold">Step 4 Active</h3>
        <Steps steps={mockSteps} activeStepIndex={3} />
      </div>
    </div>
  ),
};
