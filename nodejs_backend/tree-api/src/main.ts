import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend on port 3001
  app.enableCors({
    origin: 'http://localhost:3001',
  });
  
  await app.listen(3000);
  console.log(`🚀 Server running at http://localhost:3000`);
}
bootstrap();
