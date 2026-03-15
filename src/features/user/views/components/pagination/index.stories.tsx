import { useState } from 'react';

import { Pagination } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Pagination> = {
  title: 'User/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Playground: Story = {
  render: function PlaygroundStory() {
    const [page, setPage] = useState(1);

    return (
      <div className="w-[360px]">
        <Pagination page={page} pageSize={20} totalCount={120} onChange={setPage} />
      </div>
    );
  },
};

export const Default: Story = {
  args: {
    page: 1,
    pageSize: 20,
    totalCount: 40,
    onChange: () => {},
  },
  render: (args) => (
    <div className="w-[360px]">
      <Pagination {...args} />
    </div>
  ),
};

