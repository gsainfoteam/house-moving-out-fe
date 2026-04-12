import { fileURLToPath, URL } from 'node:url';

import { devtools } from '@tanstack/devtools-vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { VitePWA as vitePWA } from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr';

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
      vitePWA({
        registerType: 'prompt',
        includeAssets: ['favicon.png', 'favicon.ico', 'pwa/*.png', 'locales/**/*.json'],
        manifest: {
          name: '하우스연합회 퇴사검사',
          short_name: '퇴사검사',
          description: '하우스연합회 퇴사검사',
          theme_color: '#d68f2a',
          background_color: '#ffffff',
          display: 'standalone',
          icons: [
            {
              src: 'pwa/pwa-64x64.png',
              sizes: '64x64',
              type: 'image/png',
            },
            {
              src: 'pwa/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'pwa/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
            {
              src: 'pwa/maskable-icon-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
          runtimeCaching: [
            ...[
              'gh/gsainfoteam/house-moving-out-fonts@',
              'gh/orioncactus/pretendard@',
              'gh/typst/typst-assets@',
              'npm/@myriaddreamin/typst-ts-renderer@',
              'npm/@myriaddreamin/typst-ts-web-compiler@',
            ].map((p) => new RegExp(`^https://cdn\\.jsdelivr\\.net/${p}`)),
            ...['based-0.1.0'].map(
              (p) =>
                new RegExp(
                  `^https://packages\\.typst\\.org/preview/${p.replace(/\\./g, '\\.')}\\.tar\\.gz`,
                ),
            ),
          ].map((urlPattern) => ({
            handler: 'CacheFirst' as const,
            urlPattern,
            options: {
              cacheName: 'cdn-immutable',
              matchOptions: { ignoreVary: true },
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30 * 12 * 3,
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          })),
        },
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
