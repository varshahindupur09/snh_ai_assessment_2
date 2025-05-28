"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../src/app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: 'http://localhost:3001',
    });
    await app.listen(3000);
    console.log(`🚀 Server running at http://localhost:3000`);
}
bootstrap();
//# sourceMappingURL=main.js.map