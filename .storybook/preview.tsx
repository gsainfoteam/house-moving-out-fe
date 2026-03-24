import type { Preview } from '@storybook/react-vite';
import { RouterContextProvider } from '@tanstack/react-router';

import { router } from '../src/main';

import '../src/styles.css';

const preview: Preview = {
  decorators: [
    (Story) => (
      <RouterContextProvider router={router}>
        <Story />
      </RouterContextProvider>
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
