import { useRef } from 'react';

import { TypstDocument } from '@myriaddreamin/typst.react';
import { useTranslation } from 'react-i18next';

import { Button, Input, LayoutCard } from '@/common/components';

import { useInspectionNoteForm, useInspectionChecklistFile } from '../../viewmodels';
import { SignaturePad } from '../components';

export function InspectionNoteFrame() {
  const { t } = useTranslation('inspector');

  const inspectorPadRef = useRef<SignaturePad.Handle | null>(null);
  const residentPadRef = useRef<SignaturePad.Handle | null>(null);

  const { form, onSubmit } = useInspectionNoteForm();

  const { artifact } = useInspectionChecklistFile('vector', true);

  return (
    <LayoutCard.Root asChild>
      <form onSubmit={onSubmit}>
        <LayoutCard.Header>
          <LayoutCard.Text className="items-start text-left">
            <LayoutCard.Title>{t('note.title')}</LayoutCard.Title>
          </LayoutCard.Text>
        </LayoutCard.Header>
        <LayoutCard.Body className="w-full items-start">
          <div className="aspect-148/210 w-full overflow-hidden border">
            <div className="-mt-16 scale-125">
              <TypstDocument artifact={artifact} />
            </div>
          </div>

          <div className="flex w-full flex-col gap-4">
            <Input
              {...form.register('note')}
              placeholder={t('note.commentPlaceholder')}
              error={form.formState.errors.note?.message}
            />
          </div>
          <div className="flex w-full flex-col gap-2">
            <h2 className="text-box text-text-black">{t('note.inspectorSignature')}</h2>
            <SignaturePad
              ref={inspectorPadRef}
              onChange={(url) => form.setValue('inspectorSignature', url)}
            />
            <div className="flex justify-end">
              <Button
                type="button"
                variant="outline"
                className="text-box2 px-4 py-2"
                onClick={() => {
                  inspectorPadRef.current?.clear();
                  form.resetField('inspectorSignature');
                  form.clearErrors('inspectorSignature');
                }}
              >
                {t('note.resetSignature')}
              </Button>
            </div>
            {form.formState.errors.inspectorSignature && (
              <p className="text-box2 text-status-fail">
                {form.formState.errors.inspectorSignature.message}
              </p>
            )}
          </div>
          <div className="flex w-full flex-col gap-2">
            <h2 className="text-box text-text-black">{t('note.residentSignature')}</h2>
            <SignaturePad
              ref={residentPadRef}
              onChange={(url) => form.setValue('targetSignature', url)}
            />
            <div className="flex justify-end">
              <Button
                type="button"
                variant="outline"
                className="text-box2 px-4 py-2"
                onClick={() => {
                  residentPadRef.current?.clear();
                  form.resetField('targetSignature');
                  form.clearErrors('targetSignature');
                }}
              >
                {t('note.resetSignature')}
              </Button>
            </div>
            {form.formState.errors.targetSignature && (
              <p className="text-box2 text-status-fail">
                {form.formState.errors.targetSignature.message}
              </p>
            )}
          </div>
        </LayoutCard.Body>
        <LayoutCard.Footer>
          <Button
            type="submit"
            variant="failed"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {t('note.signSubmit')}
          </Button>
        </LayoutCard.Footer>
      </form>
    </LayoutCard.Root>
  );
}
