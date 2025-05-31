import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend on port 3001
  app.enableCors({
    origin: 'http://localhost:3001',
  });

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Tree API')
    .setDescription('API for managing tree-structured data with LLM integration')
    .setVersion('1.0')
    .addTag('tree')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Swagger at /api

  await app.listen(3000);
  console.log(`🚀 Server running at http://localhost:3000`);
  console.log(`📘 Swagger docs available at http://localhost:3000/api`);
}
bootstrap();
