import { Layout } from '@/common/components';

import { InspectionSubmitScreen } from './inspection-submit-screen';

import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';

const withLayout: Decorator = (Story) => (
  <Layout onMenuOpen={() => {}}>
    <Story />
  </Layout>
);

const meta: Meta<typeof InspectionSubmitScreen> = {
  title: 'Inspector/InspectionSubmitScreen',
  component: InspectionSubmitScreen,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [withLayout],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof InspectionSubmitScreen>;

const emptyArtifact = new Uint8Array();

export const AllClear: Story = {
  args: {
    artifact: emptyArtifact,
    isAllChecked: true,
    isSubmitting: false,
    onSubmit: (e) => e.preventDefault(),
  },
};

export const HasIssues: Story = {
  args: {
    artifact: emptyArtifact,
    isAllChecked: false,
    isSubmitting: false,
    onSubmit: (e) => e.preventDefault(),
  },
};

export const Submitting: Story = {
  args: {
    artifact: emptyArtifact,
    isAllChecked: true,
    isSubmitting: true,
    onSubmit: (e) => e.preventDefault(),
  },
};
