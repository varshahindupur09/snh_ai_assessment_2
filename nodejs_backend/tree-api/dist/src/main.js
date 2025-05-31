"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../src/app.module");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: 'http://localhost:3001',
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Tree API')
        .setDescription('API for managing tree-structured data with LLM integration')
        .setVersion('1.0')
        .addTag('tree')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(3000);
    console.log(`🚀 Server running at http://localhost:3000`);
    console.log(`📘 Swagger docs available at http://localhost:3000/api`);
}
bootstrap();
//# sourceMappingURL=main.js.map