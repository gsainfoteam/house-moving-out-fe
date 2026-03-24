import { I18nextProvider } from 'react-i18next';

import { i18n } from '@/common/lib';

import { ConsentView } from './consent-view';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof ConsentView> = {
  title: 'Auth/ConsentView',
  component: ConsentView,
  parameters: {
    layout: 'fullscreen',
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
type Story = StoryObj<typeof ConsentView>;

export const NoneChecked: Story = {
  args: {
    allChecked: false,
    onAllChange: () => {},
    privacyChecked: false,
    onPrivacyChange: () => {},
    tosChecked: false,
    onTosChange: () => {},
    onPrivacyTermsClick: () => {},
    onTosTermsClick: () => {},
    onSubmit: (e) => e.preventDefault(),
    isSubmitDisabled: true,
  },
};

export const AllChecked: Story = {
  args: {
    allChecked: true,
    onAllChange: () => {},
    privacyChecked: true,
    onPrivacyChange: () => {},
    tosChecked: true,
    onTosChange: () => {},
    onPrivacyTermsClick: () => {},
    onTosTermsClick: () => {},
    onSubmit: (e) => e.preventDefault(),
    isSubmitDisabled: false,
  },
};

export const PartialChecked: Story = {
  args: {
    allChecked: false,
    onAllChange: () => {},
    privacyChecked: true,
    onPrivacyChange: () => {},
    tosChecked: false,
    onTosChange: () => {},
    onPrivacyTermsClick: () => {},
    onTosTermsClick: () => {},
    onSubmit: (e) => e.preventDefault(),
    isSubmitDisabled: true,
  },
};
