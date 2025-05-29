// src/llm/dto/llm-query.dto.ts
import { IsString } from 'class-validator';

export class LlmQueryDto {
  @IsString()
  text: string;
}
