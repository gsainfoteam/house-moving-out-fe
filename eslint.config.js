import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tanstackRouter from '@tanstack/eslint-plugin-router';
import storybook from 'eslint-plugin-storybook';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';
import boundaries from 'eslint-plugin-boundaries';
import checkFile from 'eslint-plugin-check-file';
import { defineConfig } from 'eslint/config';

export default defineConfig(
  {
    ignores: [
      'dist',
      'routeTree.gen.ts',
      'storybook-static',
      '.storybook',
      'node_modules',
      '**/*.gen.ts',
      'src/@types/*.ts',
    ],
  },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      ...tanstackRouter.configs['flat/recommended'],
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: importPlugin,
      'unused-imports': unusedImports,
      boundaries,
      'check-file': checkFile,
    },
    settings: {
      ...boundaries.configs.recommended.settings,
      'boundaries/elements': [
        { type: 'model', pattern: ['models/*', 'models'] },
        { type: 'viewmodel', pattern: ['viewmodels/*', 'viewmodels'] },
        { type: 'view', pattern: ['views/*', 'views'] },
        { type: 'common', pattern: 'common/*' },
      ],
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
      ],
      semi: ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling'],
            'index',
            'object',
            'type',
          ],
          pathGroups: [
            { pattern: 'react', group: 'external', position: 'before' },
            { pattern: '@tanstack/**', group: 'external', position: 'before' },
            { pattern: '@/**', group: 'internal' },
          ],
          pathGroupsExcludedImportTypes: ['react'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import/no-duplicates': ['error', { considerQueryString: true }],
      'boundaries/dependencies': [
        2,
        {
          default: 'disallow',
          rules: [
            {
              from: { type: 'view' },
              allow: { to: { type: ['viewmodel', 'view', 'common'] } },
            },
            {
              from: { type: 'viewmodel' },
              allow: { to: { type: ['viewmodel', 'model', 'common'] } },
            },
            {
              from: { type: 'model' },
              allow: { to: { type: ['common', 'model'] } },
            },
            {
              from: { type: 'common' },
              allow: { to: { type: ['common'] } },
            },
          ],
        },
      ],
      'check-file/filename-naming-convention': [
        'error',
        { 'src/**/*.{ts,tsx}': 'KEBAB_CASE' },
        { ignoreMiddleExtensions: true },
      ],
      'check-file/folder-naming-convention': ['error', { 'src/**/': 'KEBAB_CASE' }],
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '@/features/*/*/*',
                '!@/features/*/*/index',
                './**/models/**',
                '../**/models/**',
                './**/viewmodels/**',
                '../**/viewmodels/**',
                './**/views/**',
                '../**/views/**',
              ],
              message:
                '계층 내부 세부 파일에 직접 접근하지 말고 각 디렉터리의 index.ts를 사용하세요.',
            },
            {
              group: ['@/@types/api-schema'],
              message:
                'api-schema에서 직접 타입을 import하지 마세요. 각 feature의 model에서 export한 타입을 사용하세요. (model과 api 파일 제외)',
            },
          ],
        },
      ],
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
  {
    files: ['.storybook/**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      parserOptions: {
        project: undefined,
      },
    },
  },
  {
    files: ['src/routes/**/*.{ts,tsx}'],
    rules: {
      'check-file/filename-naming-convention': 'off',
      'check-file/folder-naming-convention': 'off',
    },
  },
  {
    files: ['src/features/*/models/**/*.{ts,tsx}', 'src/common/lib/api.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '@/features/*/*/*',
                '!@/features/*/*/index',
                './**/models/**',
                '../**/models/**',
                './**/viewmodels/**',
                '../**/viewmodels/**',
                './**/views/**',
                '../**/views/**',
              ],
              message:
                '계층 내부 세부 파일에 직접 접근하지 말고 각 디렉터리의 index.ts를 사용하세요.',
            },
          ],
        },
      ],
    },
  },
  ...storybook.configs['flat/recommended'],
  prettierConfig,
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      semi: ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
    },
  },
);
