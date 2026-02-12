import { useRef } from 'react';

import { useTranslation } from 'react-i18next';

import { Button, Input, LayoutCard } from '@/common/components';

import { SignaturePad } from '../components';

type ChecklistSection = {
  title: string;
  items?: Record<string, string>;
};

export function InspectionNoteFrame() {
  const { t } = useTranslation('inspector');
  const inspectorPadRef = useRef<SignaturePad.Handle | null>(null);
  const residentPadRef = useRef<SignaturePad.Handle | null>(null);

  // TODO: mockup picking issues
  const sections = t('checklist.sections', { returnObjects: true }) as Record<
    string,
    ChecklistSection
  >;
  const issues = Object.values(sections)
    .flatMap((section) => Object.values(section.items ?? {}))
    .slice(0, 5) as string[];

  // TODO: 특이사항 코멘트 작성 + 서명 입력 UI 구현
  return (
    <LayoutCard.Root>
      <LayoutCard.Header>
        <LayoutCard.Text className="items-start text-left">
          <LayoutCard.Title>{t('note.title')}</LayoutCard.Title>
        </LayoutCard.Text>
      </LayoutCard.Header>
      <LayoutCard.Body className="w-full items-start">
        <div className="flex w-full flex-col gap-4">
          <ul className="text-box2 list-inside list-disc">
            {issues.map((issue) => (
              <li key={issue}>{issue}</li>
            ))}
          </ul>
          {/* TODO: 특이사항 코멘트 작성 시 위에 추가 */}
          <Input placeholder={t('note.commentPlaceholder')} />
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
        </div>
      </LayoutCard.Body>
      <LayoutCard.Footer>
        <Button variant="failed" className="w-full">
          {t('note.submitWithReinspection')}
        </Button>
      </LayoutCard.Footer>
    </LayoutCard.Root>
  );
}
