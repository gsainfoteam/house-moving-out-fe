import { useEffect, useState, useTransition } from 'react';

import { TypstDocument } from '@myriaddreamin/typst.react';
import { $typst, loadFonts } from '@myriaddreamin/typst.ts';

import { type checklist, generateChecklistFile } from '../models';

import type dayjs from 'dayjs';

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

export const useInspectionChecklistFile = ({
  type,
  inspectedAt,
  roomType,
  roomNumber,
  generation = 14,
  inspectionCount,
  checkedItems,
}: {
  type: 'vector' | 'pdf';
  inspectedAt: dayjs.Dayjs;
  roomType: 'a2' | 'a3' | 'b';
  roomNumber: string;
  generation?: number;
  inspectionCount: number;
  checkedItems: checklist.Item[];
}) => {
  const [artifact, setArtifact] = useState<Uint8Array | null>(null);
  const [isLoading, startTransition] = useTransition();
  const [assetLoaded, setAssetLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const buffer = await fetch('/house-full-logo.png').then((res) => res.arrayBuffer());
      await $typst.mapShadow('/assets/house-full-logo.png', new Uint8Array(buffer));
      setAssetLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (!assetLoaded) return;
    startTransition(async () => {
      try {
        const mainContent = generateChecklistFile({
          generation,
          inspectedAt,
          roomNumber,
          roomType,
          inspectionCount,
          checkedItems,
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
  }, [
    assetLoaded,
    checkedItems,
    generation,
    inspectedAt,
    inspectionCount,
    roomNumber,
    roomType,
    type,
  ]);

  return {
    artifact: artifact ?? new Uint8Array(),
    isLoading,
  };
};
