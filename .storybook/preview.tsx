import type { Preview } from '@storybook/react-vite';
import { RouterContextProvider } from '@tanstack/react-router';
import { I18nextProvider } from 'react-i18next';

import { OverlayHost, OverlayProvider, i18n } from '../src/common/lib';
import { router } from '../src/main';

import '../src/styles.css';

const preview: Preview = {
  decorators: [
    (Story) => (
      <OverlayProvider>
        <OverlayHost />
        <RouterContextProvider router={router}>
          <I18nextProvider i18n={i18n}>
            <Story />
          </I18nextProvider>
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
