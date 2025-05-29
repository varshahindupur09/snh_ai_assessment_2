// nodejs_backend/tree-api/src/app.module.ts
import { Module } from '@nestjs/common';
import { TreeModule } from './tree/tree.module';
import { LlmModule } from './llm/llm.module';

@Module({
  imports: [TreeModule, LlmModule],
})
export class AppModule {}
