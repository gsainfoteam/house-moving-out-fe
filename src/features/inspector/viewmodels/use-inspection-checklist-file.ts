import { useEffect, useMemo, useState, useTransition } from 'react';

import { $typst } from '@myriaddreamin/typst.ts';
import dayjs from 'dayjs';
import { useWatch } from 'react-hook-form';

import { checklist, mainContent } from '../models';
import { useInspectionChecklistContext } from './use-inspection-checklist-context';

import '@/common/lib/typst-init';

export const useInspectionChecklistFile = (
  type: 'vector' | 'pdf',
  disableSignature: boolean = false,
  generation = 14,
) => {
  const { form, target, items, roomType } = useInspectionChecklistContext();
  const [artifact, setArtifact] = useState<Uint8Array | null>(null);
  const [isLoading, startTransition] = useTransition();
  const [assetLoaded, setAssetLoaded] = useState(false);

  const checkedItems = useMemo(
    () =>
      Object.entries(items ?? {})
        .filter(([, v]) => v)
        .map(([slug]) => slug as checklist.Item),
    [items],
  );

  const inspectorSignature = useWatch({ control: form.control, name: 'inspectorSignature' });
  const targetSignature = useWatch({ control: form.control, name: 'targetSignature' });
  const hasSignature = !disableSignature && !!inspectorSignature && !!targetSignature;

  useEffect(() => {
    (async () => {
      setAssetLoaded(false);
      const buffer = await fetch('/house-full-logo.png').then((res) => res.arrayBuffer());
      await $typst.mapShadow('/public/house-full-logo.png', new Uint8Array(buffer));

      if (inspectorSignature) {
        const buffer = await fetch(inspectorSignature).then((res) => res.arrayBuffer());
        await $typst.mapShadow('/assets/inspector-signature.png', new Uint8Array(buffer));
      }
      if (targetSignature) {
        const buffer = await fetch(targetSignature).then((res) => res.arrayBuffer());
        await $typst.mapShadow('/assets/target-signature.png', new Uint8Array(buffer));
      }

      setAssetLoaded(true);
    })();
  }, [disableSignature, inspectorSignature, targetSignature]);

  useEffect(() => {
    if (!assetLoaded || !roomType) return;
    startTransition(async () => {
      try {
        const options = {
          items: checklist.sections.map((section) =>
            checklist[roomType][section].map((item) =>
              item ? [item, checklist.itemTitles[item], checklist.itemDescriptions[item]] : null,
            ),
          ),
          issues: checklist[roomType].issues.map((issue) => [
            issue,
            checklist.itemDescriptions[issue],
          ]),
          generation: generation,
          date: dayjs().format('MM월 DD일'),
          time: dayjs().format('HH시 mm분'),
          roomNumber: target?.roomNumber ?? '',
          roomType: roomType,
          inspectionCount: target?.inspectionCount ?? 0,
          checkedItems: checkedItems,
          hasSignature: hasSignature,
        };
        const inputs = Object.fromEntries(
          Object.entries(options).map(([key, value]) => [key, JSON.stringify(value)]),
        );
        const result =
          type === 'vector'
            ? await $typst.vector({ mainContent, inputs })
            : await $typst.pdf({ mainContent, inputs });
        setArtifact(result ?? null);
      } catch (error) {
        console.error('render error', error);
      }
    });
  }, [target, assetLoaded, checkedItems, generation, roomType, hasSignature, type]);

  return {
    artifact: artifact ?? new Uint8Array(),
    isLoading,
  };
};
