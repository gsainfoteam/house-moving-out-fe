import { useForm } from 'react-hook-form';
import { I18nextProvider } from 'react-i18next';

import { i18n } from '@/common/lib';

import { InspectionNoteView } from './inspection-note-view';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof InspectionNoteView> = {
  title: 'Inspector/InspectionNoteView',
  component: InspectionNoteView,
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
type Story = StoryObj<typeof InspectionNoteView>;

export const Default: Story = {
  render: () => {
    const { register, formState, setValue, resetField, clearErrors } =
      useForm<InspectionNoteView.FormFields>({
        defaultValues: { items: {} as never, note: '', inspectorSignature: '', targetSignature: '' },
      });

    return (
      <InspectionNoteView
        register={register}
        formState={formState}
        setValue={setValue}
        resetField={resetField}
        clearErrors={clearErrors}
        artifact={new Uint8Array()}
        onSubmit={(e) => e.preventDefault()}
      />
    );
  },
};
