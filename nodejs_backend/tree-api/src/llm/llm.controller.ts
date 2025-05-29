// src/llm/llm.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { LlmService } from './llm.service';
import { LlmQueryDto } from './dto/llm-query.dto';

@Controller('nlp')
export class LlmController {
  constructor(private readonly llmService: LlmService) {}

  @Post('tree-query')
  async getStructuredQuery(@Body() dto: LlmQueryDto) {
    // return this.llmService.getStructuredQuery(dto.text);
    return this.llmService.queryTreeFromPrompt(dto.text);
  }
}
