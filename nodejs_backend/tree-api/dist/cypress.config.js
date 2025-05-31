"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cypress_1 = require("cypress");
exports.default = (0, cypress_1.defineConfig)({
    projectId: 'qgeik2',
    e2e: {
        baseUrl: 'http://localhost:3001',
        supportFile: 'cypress/support/e2e.ts',
    },
});
//# sourceMappingURL=cypress.config.js.map