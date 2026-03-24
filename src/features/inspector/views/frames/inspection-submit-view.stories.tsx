import { I18nextProvider } from 'react-i18next';

import { i18n } from '@/common/lib';

import { InspectionSubmitView } from './inspection-submit-view';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof InspectionSubmitView> = {
  title: 'Inspector/InspectionSubmitView',
  component: InspectionSubmitView,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <I18nextProvider i18n={i18n}>
        <Story />
      </I18nextProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof InspectionSubmitView>;

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
