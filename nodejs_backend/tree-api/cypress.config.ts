// nodejs_backend/tree-api/cypress.config.ts
import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'qgeik2',
  e2e: {
    baseUrl: 'http://localhost:3001',
    supportFile: 'cypress/support/e2e.ts',
  },
});