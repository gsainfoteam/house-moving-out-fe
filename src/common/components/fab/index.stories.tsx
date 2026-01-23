import { OverlayProvider } from 'overlay-kit';

import HomeIcon from '@/assets/icons/home.svg?react';
import LogOutIcon from '@/assets/icons/log-out.svg?react';
import TranslateIcon from '@/assets/icons/translate.svg?react';

import { Fab } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Fab> = {
  title: 'Components/Fab',
  component: Fab,
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
type Story = StoryObj<typeof Fab>;

export const Default: Story = {
  render: () => (
    <div className="relative h-screen w-screen overflow-hidden">
      <div className="absolute right-6 bottom-6">
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
    </div>
  ),
};

export const SingleItem: Story = {
  render: () => (
    <div className="relative h-screen w-screen overflow-hidden">
      <div className="absolute right-6 bottom-6">
        <Fab>
          <Fab.Item icon={<HomeIcon className="size-6" />} label="문의하기" />
        </Fab>
      </div>
    </div>
  ),
};

export const TwoItems: Story = {
  render: () => (
    <div className="relative h-screen w-screen overflow-hidden">
      <div className="absolute right-6 bottom-6">
        <Fab>
          <Fab.Item icon={<HomeIcon className="size-6" />} label="문의하기" />
          <Fab.Item icon={<TranslateIcon className="size-6" />} label="언어변경" />
        </Fab>
      </div>
    </div>
  ),
};

export const WithActions: Story = {
  render: () => (
    <div className="relative h-screen w-screen overflow-hidden">
      <div className="absolute right-6 bottom-6">
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
    </div>
  ),
};
