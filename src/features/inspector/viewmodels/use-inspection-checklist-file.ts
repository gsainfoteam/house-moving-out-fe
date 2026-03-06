import { useEffect, useMemo, useState, useTransition } from 'react';

import { TypstDocument } from '@myriaddreamin/typst.react';
import { $typst, loadFonts } from '@myriaddreamin/typst.ts';
import dayjs from 'dayjs';
import { useWatch } from 'react-hook-form';

import { type checklist, generateChecklistFile } from '../models';
import { useInspectionChecklistContext } from './use-inspection-checklist-context';

declare global {
  interface Window {
    typstInitialized: boolean;
  }
}

if (!window.typstInitialized) {
  window.typstInitialized = true;
  $typst.setCompilerInitOptions({
    beforeBuild: [
      loadFonts([
        'https://cdn.jsdelivr.net/npm/font-kopubworld@1.0/fonts/KoPubWorld-Batang-Light.otf',
        'https://cdn.jsdelivr.net/npm/font-kopubworld@1.0/fonts/KoPubWorld-Batang-Bold.otf',
      ]),
    ],
    getModule: () =>
      'https://cdn.jsdelivr.net/npm/@myriaddreamin/typst-ts-web-compiler/pkg/typst_ts_web_compiler_bg.wasm',
  });
  TypstDocument.setWasmModuleInitOptions({
    beforeBuild: [],
    getModule: () =>
      'https://cdn.jsdelivr.net/npm/@myriaddreamin/typst-ts-renderer/pkg/typst_ts_renderer_bg.wasm',
  });
}

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
      await $typst.mapShadow('/assets/house-full-logo.png', new Uint8Array(buffer));

      if (disableSignature) {
        await $typst.unmapShadow('/assets/inspector-signature.png');
        await $typst.unmapShadow('/assets/target-signature.png');
      } else {
        if (inspectorSignature) {
          const buffer = await fetch(inspectorSignature).then((res) => res.arrayBuffer());
          await $typst.mapShadow('/assets/inspector-signature.png', new Uint8Array(buffer));
        }
        if (targetSignature) {
          const buffer = await fetch(targetSignature).then((res) => res.arrayBuffer());
          await $typst.mapShadow('/assets/target-signature.png', new Uint8Array(buffer));
        }
      }

      setAssetLoaded(true);
    })();
  }, [disableSignature, inspectorSignature, targetSignature]);

  useEffect(() => {
    if (!assetLoaded || !roomType) return;
    startTransition(async () => {
      try {
        const mainContent = generateChecklistFile({
          generation,
          inspectedAt: dayjs(),
          roomNumber: target?.roomNumber ?? '',
          roomType,
          inspectionCount: target?.inspectionCount ?? 0,
          checkedItems,
          hasSignature,
        });
        const result =
          type === 'vector'
            ? await $typst.vector({ mainContent })
            : await $typst.pdf({ mainContent });
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
