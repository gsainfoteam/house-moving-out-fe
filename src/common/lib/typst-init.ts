import { TypstDocument } from '@myriaddreamin/typst.react';
import { $typst, loadFonts } from '@myriaddreamin/typst.ts';
import { disableDefaultFontAssets } from '@myriaddreamin/typst.ts/dist/esm/options.init.mjs';

declare global {
  interface Window {
    typstInitialized: boolean;
  }
}

if (!window.typstInitialized) {
  window.typstInitialized = true;
  $typst.setCompilerInitOptions({
    beforeBuild: [
      disableDefaultFontAssets(),
      loadFonts([
        'https://cdn.jsdelivr.net/gh/gsainfoteam/house-moving-out-fonts@1.0/HCRBatang-subset.ttf',
        'https://cdn.jsdelivr.net/gh/gsainfoteam/house-moving-out-fonts@1.0/HCRBatang-Bold-subset.ttf',
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
