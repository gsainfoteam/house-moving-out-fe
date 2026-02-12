import { useRef } from 'react';

import { Button, LayoutCard } from '@/common/components';

import { SignaturePad } from '../components';

export function InspectionNoteFrame() {
  const inspectorPadRef = useRef<SignaturePad.Handle | null>(null);
  const residentPadRef = useRef<SignaturePad.Handle | null>(null);

  // TODO: 특이사항 코멘트 작성 + 서명 입력 UI 구현
  return (
    <LayoutCard.Root>
      <LayoutCard.Header>
        <LayoutCard.Text className="items-start text-left">
          <LayoutCard.Title>특이사항 재확인</LayoutCard.Title>
          <ul className="text-box2 text-text-gray mt-1 list-inside list-disc">
            <li>책상 서랍 정리 미흡</li>
            <li>욕실 청소 상태 다시 확인</li>
          </ul>
        </LayoutCard.Text>
      </LayoutCard.Header>
      <LayoutCard.Body>
        <div className="flex flex-col gap-2">
          <h2 className="text-box text-text-black">검사자 서명</h2>
          <SignaturePad ref={inspectorPadRef} />
          <div className="flex justify-end">
            <Button
              type="button"
              variant="outline"
              className="text-box2 px-4 py-2"
              onClick={() => inspectorPadRef.current?.clear()}
            >
              서명 초기화
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-box text-text-black">퇴사자 서명</h2>
          <SignaturePad ref={residentPadRef} />
          <div className="flex justify-end">
            <Button
              type="button"
              variant="outline"
              className="text-box2 px-4 py-2"
              onClick={() => residentPadRef.current?.clear()}
            >
              서명 초기화
            </Button>
          </div>
        </div>
      </LayoutCard.Body>
      <LayoutCard.Footer>
        <Button variant="failed" className="w-full">
          검사 완료 (재검사 요청)
        </Button>
      </LayoutCard.Footer>
    </LayoutCard.Root>
  );
}
