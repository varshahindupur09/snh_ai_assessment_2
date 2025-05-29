// src/llm/llm.module.ts
import { Module } from '@nestjs/common';
import { LlmController } from './llm.controller';
import { LlmService } from './llm.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [LlmController],
  providers: [LlmService, PrismaService],
})
export class LlmModule {}
