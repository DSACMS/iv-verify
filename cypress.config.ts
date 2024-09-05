import { defineConfig } from "cypress";

export default defineConfig({
  video: true,
  includeShadowDom: true,
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
    },
  },
});
