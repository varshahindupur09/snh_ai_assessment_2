// test/test-suite/tree/tree.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { TreeService } from '../../../src/tree/tree.service';
import { PrismaService } from '../../../prisma/prisma.service';

describe('TreeService', () => {
  let service: TreeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TreeService, PrismaService], // ✅ provide both
    }).compile();

    service = module.get<TreeService>(TreeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
