import { useRef, useState } from 'react';

import { SignaturePad } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof SignaturePad> = {
  title: 'Inspector/SignaturePad',
  component: SignaturePad,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    penColor: {
      control: 'color',
      description: '펜 색상',
    },
    lineWidth: {
      control: { type: 'number', min: 1, max: 8, step: 1 },
      description: '선 두께',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SignaturePad>;

export const Playground: Story = {
  args: {
    penColor: 'var(--color-text-primary)',
    lineWidth: 2,
  },
};

export const WithControls: Story = {
  render: (args) => {
    const padRef = useRef<SignaturePad.Handle | null>(null);
    const [dataUrl, setDataUrl] = useState<string>('');

    return (
      <div className="flex flex-col items-stretch gap-4">
        <SignaturePad
          ref={padRef}
          {...args}
          onChange={(url) => {
            setDataUrl(url);
          }}
        />
        <div className="flex gap-2">
          <button
            type="button"
            className="bg-bg-surface text-text-primary text-body rounded-lg px-3 py-2"
            onClick={() => padRef.current?.clear()}
          >
            지우기
          </button>
          <button
            type="button"
            className="bg-primary text-text-white text-body rounded-lg px-3 py-2"
            onClick={() => {
              if (!padRef.current) return;
              setDataUrl(padRef.current.toDataURL());
            }}
          >
            저장 미리보기
          </button>
        </div>
        {dataUrl && (
          <div className="flex flex-col gap-2">
            <span className="text-body text-text-secondary">dataURL 미리보기</span>
            <img
              src={dataUrl}
              alt="signature-preview"
              className="bg-bg border-border h-40 w-full rounded-2xl border object-contain"
            />
          </div>
        )}
      </div>
    );
  },
  args: {
    penColor: '#000000',
    lineWidth: 2,
  },
};
