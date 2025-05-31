// // test/integration/llm/llm.service.int-spec.ts
// import { Test, TestingModule } from '@nestjs/testing';
// import { LlmService } from '../../../src/llm/llm.service';
// import { PrismaService } from '../../../prisma/prisma.service';
// import { LambdaClient } from '@aws-sdk/client-lambda';
// import { LlmModule } from '../../../src/llm/llm.module';

// jest.mock('@aws-sdk/client-lambda');

// describe('LlmService (integration)', () => {
//   let service: LlmService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       imports: [LlmModule],
//       providers: [PrismaService],
//     }).compile();

//     service = module.get<LlmService>(LlmService);

//     (LambdaClient.prototype.send as jest.Mock).mockResolvedValue({
//       Payload: new TextEncoder().encode(
//         JSON.stringify({ structuredFilters: { parent: 'root' } })
//       ),
//     });
//   });

//   it('should return real children from DB', async () => {
//     const result = await service.queryTreeFromPrompt('Show me all animals under root');
//     if ('error' in result) 
//     {
//       throw new Error(`Expected children but got error: ${result.error}`);
//     }
//     console.log('🧪 Final result:', result);
//     expect(Array.isArray(result)).toBe(true);
//     expect(result.length).toBeGreaterThan(0);
//     expect(result[0]).toHaveProperty('label');
//   });
// });

// test/integration/llm/llm.service.int-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { LlmService } from '../../../src/llm/llm.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { LambdaClient } from '@aws-sdk/client-lambda';
import { LlmModule } from '../../../src/llm/llm.module';

// Mock LambdaClient globally
jest.mock('@aws-sdk/client-lambda', () => {
  const original = jest.requireActual('@aws-sdk/client-lambda');
  return {
    ...original,
    LambdaClient: jest.fn().mockImplementation(() => ({
      send: jest.fn().mockResolvedValue({
        Payload: new TextEncoder().encode(
          JSON.stringify({ structuredFilters: { parent: 'root' } })
        ),
      }),
    })),
  };
});

describe('LlmService (integration)', () => {
  let service: LlmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LlmModule],
      providers: [PrismaService],
    }).compile();

    service = module.get<LlmService>(LlmService);
  });

  it('should return real children from DB', async () => {
    const result = await service.queryTreeFromPrompt('Show me all animals under root');

    if ('error' in result) {
      throw new Error(`Expected children but got error: ${result.error}`);
    }

    console.log('🧪 Final result:', result);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty('label');
  });
});
