import { useRef } from 'react';

import { TypstDocument } from '@myriaddreamin/typst.react';
import { useTranslation } from 'react-i18next';

import { Button, Input, LayoutCard } from '@/common/components';
import type { checklist } from '@/common/lib';

import { SignaturePad } from '../components';

import type { UseFormRegister, UseFormReturn, UseFormStateReturn } from 'react-hook-form';

export function InspectionNoteScreen({
  register,
  formState,
  setValue,
  resetField,
  clearErrors,
  artifact,
  onSubmit,
}: InspectionNoteScreen.Props) {
  const { t } = useTranslation('inspector');

  const inspectorPadRef = useRef<SignaturePad.Handle | null>(null);
  const residentPadRef = useRef<SignaturePad.Handle | null>(null);

  return (
    <LayoutCard.Root asChild>
      <form onSubmit={onSubmit}>
        <LayoutCard.Header>
          <LayoutCard.Text className="items-start text-left">
            <LayoutCard.Title>{t('note.title')}</LayoutCard.Title>
          </LayoutCard.Text>
        </LayoutCard.Header>
        <LayoutCard.Body className="w-full items-start">
          <div className="aspect-148/210 w-full overflow-hidden rounded-lg border border-border">
            <div className="-mt-16 scale-125">
              <TypstDocument artifact={artifact} />
            </div>
          </div>

          <div className="flex w-full flex-col gap-4">
            <Input
              {...register('note')}
              placeholder={t('note.commentPlaceholder')}
              error={formState.errors.note?.message}
            />
          </div>
          <div className="flex w-full flex-col gap-2">
            <h2 className="text-body-lg text-text-primary">{t('note.inspectorSignature')}</h2>
            <SignaturePad
              ref={inspectorPadRef}
              onChange={(url) => setValue('inspectorSignature', url)}
            />
            <div className="flex justify-end">
              <Button
                type="button"
                variant="outline"
                className="text-body px-4 py-2"
                onClick={() => {
                  inspectorPadRef.current?.clear();
                  resetField('inspectorSignature');
                  clearErrors('inspectorSignature');
                }}
              >
                {t('note.resetSignature')}
              </Button>
            </div>
            {formState.errors.inspectorSignature && (
              <p className="text-body text-status-fail">
                {formState.errors.inspectorSignature.message}
              </p>
            )}
          </div>
          <div className="flex w-full flex-col gap-2">
            <h2 className="text-body-lg text-text-primary">{t('note.residentSignature')}</h2>
            <SignaturePad
              ref={residentPadRef}
              onChange={(url) => setValue('targetSignature', url)}
            />
            <div className="flex justify-end">
              <Button
                type="button"
                variant="outline"
                className="text-body px-4 py-2"
                onClick={() => {
                  residentPadRef.current?.clear();
                  resetField('targetSignature');
                  clearErrors('targetSignature');
                }}
              >
                {t('note.resetSignature')}
              </Button>
            </div>
            {formState.errors.targetSignature && (
              <p className="text-body text-status-fail">
                {formState.errors.targetSignature.message}
              </p>
            )}
          </div>
        </LayoutCard.Body>
        <LayoutCard.Footer>
          <Button
            type="submit"
            variant="failed"
            className="w-full"
            disabled={formState.isSubmitting}
          >
            {t('note.signSubmit')}
          </Button>
        </LayoutCard.Footer>
      </form>
    </LayoutCard.Root>
  );
}

export namespace InspectionNoteScreen {
  export type FormFields = {
    items: Record<checklist.Item, boolean>;
    note: string;
    inspectorSignature: string;
    targetSignature: string;
  };

  export type Props = {
    register: UseFormRegister<FormFields>;
    formState: UseFormStateReturn<FormFields>;
    setValue: UseFormReturn<FormFields>['setValue'];
    resetField: UseFormReturn<FormFields>['resetField'];
    clearErrors: UseFormReturn<FormFields>['clearErrors'];
    artifact: Uint8Array;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
  };
}
