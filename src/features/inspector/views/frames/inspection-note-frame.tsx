import { useMemo, useRef } from 'react';

import { useParams } from '@tanstack/react-router';

import { useTranslation } from 'react-i18next';

import { Button, Input, LayoutCard } from '@/common/components';

import { useInspectionNoteForm } from '../../viewmodels';
import { SignaturePad } from '../components';

export function InspectionNoteFrame() {
  const { t } = useTranslation('inspector');
  const { uuid } = useParams({ from: '/_auth-required/_user/inspector/$uuid/note' });

  const inspectorPadRef = useRef<SignaturePad.Handle | null>(null);
  const residentPadRef = useRef<SignaturePad.Handle | null>(null);

  const { form, getItems, onSubmit } = useInspectionNoteForm(uuid, inspectorPadRef, residentPadRef);

  const uncheckedItems = useMemo(() => {
    return getItems().filter((item) => !item.isChecked);
  }, [getItems]);

  return (
    <LayoutCard.Root asChild>
      <form onSubmit={onSubmit}>
        <LayoutCard.Header>
          <LayoutCard.Text className="items-start text-left">
            <LayoutCard.Title>{t('note.title')}</LayoutCard.Title>
          </LayoutCard.Text>
        </LayoutCard.Header>
        <LayoutCard.Body className="w-full items-start">
          <div className="flex w-full flex-col gap-4">
            {uncheckedItems.length > 0 && (
              <ul className="text-box2 list-inside list-disc">
                {uncheckedItems.map((item) => (
                  <li key={item.slug}>{item.label}</li>
                ))}
              </ul>
            )}
            <Input
              {...form.register('comment')}
              placeholder={t('note.commentPlaceholder')}
              error={form.formState.errors.comment?.message}
            />
          </div>
          <div className="flex w-full flex-col gap-2">
            <h2 className="text-box text-text-black">{t('note.inspectorSignature')}</h2>
            <SignaturePad ref={inspectorPadRef} />
            <div className="flex justify-end">
              <Button
                type="button"
                variant="outline"
                className="text-box2 px-4 py-2"
                onClick={() => inspectorPadRef.current?.clear()}
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
            <SignaturePad ref={residentPadRef} />
            <div className="flex justify-end">
              <Button
                type="button"
                variant="outline"
                className="text-box2 px-4 py-2"
                onClick={() => residentPadRef.current?.clear()}
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
            {t('note.submitWithReinspection')}
          </Button>
        </LayoutCard.Footer>
      </form>
    </LayoutCard.Root>
  );
}
