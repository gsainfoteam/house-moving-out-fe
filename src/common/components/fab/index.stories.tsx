import HomeIcon from '@/assets/icons/home.svg?react';
import LogOutIcon from '@/assets/icons/log-out.svg?react';
import TranslateIcon from '@/assets/icons/translate.svg?react';

import { Fab } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Fab> = {
  title: 'Common/Fab',
  component: Fab,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Fab>;

export const Default: Story = {
  render: () => (
    <div className="bg-bg-surface h-screen w-screen p-8">
      <div className="text-text-black">
        <h1 className="text-h1 mb-4">Fab 컴포넌트 예시</h1>
        <p className="text-body mb-2">오른쪽 아래에 있는 Fab 버튼을 클릭해보세요.</p>
        <p className="text-body">메뉴가 열리면 배경이 dim 처리되고 메뉴 항목들이 표시됩니다.</p>
      </div>
      <Fab>
        <Fab.Item icon={<HomeIcon className="size-6" />} label="문의하기" />
        <Fab.Item icon={<TranslateIcon className="size-6" />} label="언어변경" />
        <Fab.Item
          icon={<LogOutIcon className="size-6" />}
          label="로그아웃"
          className="text-status-fail"
        />
      </Fab>
    </div>
  ),
};

export const SingleItem: Story = {
  render: () => (
    <div className="bg-bg-surface h-screen w-screen p-8">
      <div className="text-text-black">
        <h1 className="text-h1 mb-4">단일 항목</h1>
        <p className="text-body">Fab 메뉴에 하나의 항목만 있는 경우입니다.</p>
      </div>
      <Fab>
        <Fab.Item icon={<HomeIcon className="size-6" />} label="문의하기" />
      </Fab>
    </div>
  ),
};

export const TwoItems: Story = {
  render: () => (
    <div className="bg-bg-surface h-screen w-screen p-8">
      <div className="text-text-black">
        <h1 className="text-h1 mb-4">두 개의 항목</h1>
        <p className="text-body">Fab 메뉴에 두 개의 항목이 있는 경우입니다.</p>
      </div>
      <Fab>
        <Fab.Item icon={<HomeIcon className="size-6" />} label="문의하기" />
        <Fab.Item icon={<TranslateIcon className="size-6" />} label="언어변경" />
      </Fab>
    </div>
  ),
};

export const WithActions: Story = {
  render: () => (
    <div className="bg-bg-surface h-screen w-screen p-8">
      <div className="text-text-black">
        <h1 className="text-h1 mb-4">클릭 액션 예시</h1>
        <p className="text-body mb-2">각 메뉴 항목에 onClick 핸들러가 연결되어 있습니다.</p>
        <p className="text-body">항목을 클릭하면 액션이 실행되고 메뉴가 자동으로 닫힙니다.</p>
      </div>
      <Fab>
        <Fab.Item
          icon={<HomeIcon className="size-6" />}
          label="문의하기"
          onClick={() => {
            alert('문의하기 클릭');
          }}
        />
        <Fab.Item
          icon={<TranslateIcon className="size-6" />}
          label="언어변경"
          onClick={() => {
            alert('언어변경 클릭');
          }}
        />
        <Fab.Item
          icon={<LogOutIcon className="size-6" />}
          label="로그아웃"
          className="text-status-fail"
          onClick={() => {
            alert('로그아웃 클릭');
          }}
        />
      </Fab>
    </div>
  ),
};
