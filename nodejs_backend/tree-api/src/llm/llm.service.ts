// src/llm/llm.service.ts
import { Injectable } from '@nestjs/common';
import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class LlmService {
  private lambdaClient = new LambdaClient({ region: 'us-east-1' });

  constructor(private readonly prisma: PrismaService) {}

  async getStructuredQuery(prompt: string): Promise<any> {
    const payload = JSON.stringify({ prompt });
    console.log('📨 Sending prompt to Lambda:', prompt);

    const command = new InvokeCommand({
      FunctionName: 'bedrock-llm-lambda',
      Payload: new TextEncoder().encode(payload),
    });

    const response = await this.lambdaClient.send(command);
    const rawPayload = new TextDecoder().decode(response.Payload);
    console.log('🧾 Raw Lambda response:', rawPayload);

    try {
      const parsed = JSON.parse(rawPayload);

      if (parsed.structuredFilters?.root) {
        const value = parsed.structuredFilters.root;

        // If it's a simple "all", normalize to parent = "root"
        if (value === 'all') {
          parsed.structuredFilters.parent = 'root';
        }

        // If it's comma-separated just take "root" as parent
        else if (value.includes(',')) {
          parsed.structuredFilters.parent = 'root';
        }

        delete parsed.structuredFilters.root;
      }


      if (parsed.structuredFilters) {
        return parsed.structuredFilters;
      }

      if (parsed.error) {
        console.error('❌ Lambda error:', parsed.error);
        return null;
      }

      // Fallback: attempt to extract valid JSON object manually
      const match = rawPayload.match(/{[^}]*"parent"\s*:\s*"[^"]+"[^}]*}/);
      if (match) {
        return JSON.parse(match[0]);
      }

      return null;
    } catch (err) {
      console.error('❌ Failed to parse Lambda output:', err);
      return null;
    }
  }

  async queryTreeFromPrompt(prompt: string) {
    console.log('🟡 Prompt received:', prompt);

    const structured = await this.getStructuredQuery(prompt);
    console.log('🟢 Structured response from LLM:', structured);

    if (!structured || !structured.parent) {
      console.warn('⚠️ No parent label in LLM response:', structured);
      return { error: 'LLM did not return a valid parent label' };
    }

    const parent = await this.prisma.treeNode.findFirst({
      where: { label: structured.parent },
    });

    console.log('🔍 Parent node found:', parent);

    if (!parent) {
      return { error: `No node found for label "${structured.parent}"` };
    }

    const children = await this.prisma.treeNode.findMany({
      where: { parentId: parent.id },
    });

    console.log(`✅ Found ${children.length} children.`);
    return children;
  }
}
