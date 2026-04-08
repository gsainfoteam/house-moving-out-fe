import { useForm } from 'react-hook-form';

import { Layout } from '@/common/components';

import { InspectionNoteScreen } from './inspection-note-screen';

import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';

const withLayout: Decorator = (Story) => (
  <Layout onMenuOpen={() => {}}>
    <Story />
  </Layout>
);

const meta: Meta<typeof InspectionNoteScreen> = {
  title: 'Inspector/InspectionNoteScreen',
  component: InspectionNoteScreen,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [withLayout],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof InspectionNoteScreen>;

export const Default: Story = {
  render: () => {
    const { register, formState, setValue, resetField, clearErrors } =
      useForm<InspectionNoteScreen.FormFields>({
        defaultValues: {
          items: {} as never,
          note: '',
          inspectorSignature: '',
          targetSignature: '',
        },
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
