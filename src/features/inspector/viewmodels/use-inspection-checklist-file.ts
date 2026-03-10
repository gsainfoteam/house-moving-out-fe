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
    const tryRegister = async (from: string, to: string) => {
      const buffer = await fetch(from).then((res) => res.arrayBuffer());
      await $typst.mapShadow(to, new Uint8Array(buffer));
    };
    (async () => {
      setAssetLoaded(false);
      try {
        await tryRegister('/house-full-logo.png', '/public/house-full-logo.png');
        if (hasSignature) {
          await tryRegister(inspectorSignature, '/assets/inspector-signature.png');
          await tryRegister(targetSignature, '/assets/target-signature.png');
        }
      } catch (error) {
        console.error('register error', error);
      } finally {
        setAssetLoaded(true);
      }
    })();
  }, [hasSignature, inspectorSignature, targetSignature]);

  useEffect(() => {
    if (!assetLoaded || !roomType) return;
    let canceled = false;
    startTransition(async () => {
      try {
        const options = {
          items: checklist.sections.map((section) =>
            checklist[roomType][section].map((item) => {
              if (!item) return null;
              const [key] = item;
              return [key, checklist.itemTitles[key], checklist.itemDescriptions[key]];
            }),
          ),
          issues: checklist[roomType].issues.map(([issue]) => [
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
        if (canceled) return;
        setArtifact(result ?? null);
      } catch (error) {
        console.error('render error', error);
      }
    });
    return () => {
      canceled = true;
    };
  }, [target, assetLoaded, checkedItems, generation, roomType, hasSignature, type]);

  return {
    artifact: artifact ?? new Uint8Array(),
    isLoading,
  };
};
