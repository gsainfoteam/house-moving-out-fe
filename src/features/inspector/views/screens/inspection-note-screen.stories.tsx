import { useForm } from 'react-hook-form';
import { I18nextProvider } from 'react-i18next';

import { i18n } from '@/common/lib';

import { InspectionNoteScreen } from './inspection-note-screen';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof InspectionNoteScreen> = {
  title: 'Inspector/InspectionNoteScreen',
  component: InspectionNoteScreen,
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
type Story = StoryObj<typeof InspectionNoteScreen>;

export const Default: Story = {
  render: () => {
    const { register, formState, setValue, resetField, clearErrors } =
      useForm<InspectionNoteScreen.FormFields>({
        defaultValues: { items: {} as never, note: '', inspectorSignature: '', targetSignature: '' },
      });

    return (
      <InspectionNoteScreen
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
