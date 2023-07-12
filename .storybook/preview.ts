import type { Preview } from "@storybook/vue3";
import { setup } from '@storybook/vue3'
import { setupMock } from '../src/mock/index';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';


setup((app) => {
  setupMock();
  app.use(ElementPlus)
})

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
