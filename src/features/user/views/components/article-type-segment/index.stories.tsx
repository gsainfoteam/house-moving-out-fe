import { useState } from 'react';

import { ArticleType } from '../../../models';

import { ArticleTypeSegment } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof ArticleTypeSegment> = {
  title: 'User/ArticleTypeSegment',
  component: ArticleTypeSegment,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ArticleTypeSegment>;

export const Playground: Story = {
  render: function PlaygroundStory() {
    const [value, setValue] = useState<ArticleType>(ArticleType.NOTICE);

    return (
      <div className="w-[360px]">
        <ArticleTypeSegment value={value} onChange={setValue} />
      </div>
    );
  },
};

export const Default: Story = {
  args: {
    value: ArticleType.NOTICE,
    onChange: () => {},
  },
  render: (args) => (
    <div className="w-[360px]">
      <ArticleTypeSegment {...args} />
    </div>
  ),
};
