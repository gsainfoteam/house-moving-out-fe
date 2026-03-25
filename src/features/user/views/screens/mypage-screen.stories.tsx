import { Gender } from '@/features/user';

import { MypageScreen } from './mypage-screen';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof MypageScreen> = {
  title: 'User/MypageScreen',
  component: MypageScreen,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MypageScreen>;

export const Default: Story = {
  args: {
    isLoading: false,
    name: '홍길동',
    email: 'gildong@gm.gist.ac.kr',
    studentNumber: '20250000',
    gender: Gender.MALE,
    roomNumber: '101',
    houseName: 'G',
    applyCleaningService: false,
    isInspector: false,
    onLogout: () => {},
  },
};

export const Inspector: Story = {
  args: {
    isLoading: false,
    name: '김지니',
    email: 'jini@gm.gist.ac.kr',
    studentNumber: '20240001',
    gender: Gender.FEMALE,
    roomNumber: '205',
    houseName: 'H',
    applyCleaningService: false,
    isInspector: true,
    onLogout: () => {},
  },
};

export const CleaningService: Story = {
  args: {
    isLoading: false,
    name: '이민준',
    email: 'minjun@gm.gist.ac.kr',
    studentNumber: '20230042',
    gender: Gender.MALE,
    roomNumber: '312',
    houseName: 'G',
    applyCleaningService: true,
    isInspector: false,
    onLogout: () => {},
  },
};

export const NoRoom: Story = {
  args: {
    isLoading: false,
    name: '이민준',
    email: 'minjun@gm.gist.ac.kr',
    studentNumber: '20230042',
    onLogout: () => {},
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};
