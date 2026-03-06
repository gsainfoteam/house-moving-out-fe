import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath, URL } from 'node:url';

import { devtools } from '@tanstack/devtools-vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv, normalizePath } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import svgr from 'vite-plugin-svgr';

const require = createRequire(import.meta.url);

const wasm1Path = normalizePath(
  path.join(
    path.dirname(require.resolve('@myriaddreamin/typst-ts-web-compiler/package.json')),
    'pkg/typst_ts_web_compiler_bg.wasm',
  ),
);
const wasm2Path = normalizePath(
  path.join(
    path.dirname(require.resolve('@myriaddreamin/typst-ts-renderer/package.json')),
    'pkg/typst_ts_renderer_bg.wasm',
  ),
);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiBaseUrl = env.VITE_API_BASE_URL;

  return {
    plugins: [
      devtools(),
      tanstackRouter({
        target: 'react',
        autoCodeSplitting: true,
      }),
      react(),
      tailwindcss(),
      svgr(),
      viteStaticCopy({
        targets: [
          { src: wasm1Path, dest: '' },
          { src: wasm2Path, dest: '' },
        ],
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: apiBaseUrl,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
          configure: (proxy, _options) => {
            proxy.on('proxyReq', (proxyReq) => {
              proxyReq.removeHeader('origin');
              proxyReq.removeHeader('referer');
            });
            proxy.on('proxyRes', (proxyRes) => {
              const cookies = proxyRes.headers['set-cookie'];
              if (cookies) {
                proxyRes.headers['set-cookie'] = cookies.map((cookie) => {
                  return cookie
                    .replace(/Secure(; )?/, '')
                    .replace(/HttpOnly(; )?/, '')
                    .replace('Path=', 'Path=/api');
                });
              }
            });
          },
        },
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('@tanstack')) {
              return 'vendor-tanstack';
            }
          },
        },
      },
    },
  };
});
