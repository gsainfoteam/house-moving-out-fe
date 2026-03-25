import type { Preview } from '@storybook/react-vite';
import { RouterContextProvider } from '@tanstack/react-router';

import { OverlayHost, OverlayProvider } from '../src/common/lib';
import { router } from '../src/main';

import { withLocale } from './decorators';

import '../src/styles.css';

const preview: Preview = {
  globalTypes: {
    locale: {
      description: 'i18n locale',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'ko', title: '한국어' },
          { value: 'en', title: 'English' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    locale: 'ko',
  },
  decorators: [
    withLocale,
    (Story) => (
      <OverlayProvider>
        <OverlayHost />
        <RouterContextProvider router={router}>
          <Story />
        </RouterContextProvider>
      </OverlayProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
