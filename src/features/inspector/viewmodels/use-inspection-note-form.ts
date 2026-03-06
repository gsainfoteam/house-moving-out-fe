import { useCallback } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { partition } from 'es-toolkit/array';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { useSubmitInspectionResult } from './queries';
import { useInspectionChecklistContext } from './use-inspection-checklist-context';

type SignaturePadHandle = {
  clear: () => void;
  isEmpty: () => boolean;
  toDataURL: () => string;
  toBlob: () => Promise<Blob | null>;
};

const inspectionNoteSchema = z.object({
  comment: z.string().optional(),
  inspectorSignature: z.instanceof(Blob, { message: '검사자 서명이 필요합니다.' }),
  targetSignature: z.instanceof(Blob, { message: '퇴사자 서명이 필요합니다.' }),
});

export type InspectionNoteFormValues = z.infer<typeof inspectionNoteSchema>;

// TODO: 사인을 pdf에 넣고 그걸 페이로드에 넣어야 함, presigned url에 넣는 거까지 구현하기

export const useInspectionNoteForm = (
  uuid: string,
  inspectorPadRef: React.RefObject<SignaturePadHandle | null>,
  residentPadRef: React.RefObject<SignaturePadHandle | null>,
) => {
  const { mutateAsync: submitInspectionResult } = useSubmitInspectionResult();
  const { items } = useInspectionChecklistContext();

  const form = useForm<InspectionNoteFormValues>({
    resolver: zodResolver(inspectionNoteSchema),
    defaultValues: {
      comment: '',
    },
  });

  const onValid = useCallback(async () => {
    const inspectorPad = inspectorPadRef.current;
    const residentPad = residentPadRef.current;

    if (!inspectorPad || !residentPad) return;

    if (inspectorPad.isEmpty() || residentPad.isEmpty()) {
      form.setError('inspectorSignature', { message: '서명이 필요합니다.' });
      return;
    }

    const inspectorSignatureBlob = await inspectorPad.toBlob();
    const targetSignatureBlob = await residentPad.toBlob();

    if (!inspectorSignatureBlob || !targetSignatureBlob) {
      form.setError('inspectorSignature', { message: '서명을 가져오는 중 오류가 발생했습니다.' });
      return;
    }

    const [checkedItems, uncheckedItems] = partition(Object.entries(items), ([, v]) => v);
    const passed = checkedItems.map(([slug]) => slug);
    const failed = uncheckedItems.map(([slug]) => slug);

    await submitInspectionResult({
      params: { path: { uuid } },
      body: {
        passed: passed.length > 0 ? passed : undefined,
        failed: failed.length > 0 ? failed : undefined,
        contentLength: inspectorSignatureBlob.size + targetSignatureBlob.size,
      },
    });
  }, [form, inspectorPadRef, residentPadRef, submitInspectionResult, uuid, items]);

  const onSubmit = useCallback(() => form.handleSubmit(onValid)(), [form, onValid]);

  return {
    form,
    onSubmit,
    items,
  };
};
