import { PrismaService } from '../../prisma/prisma.service';
export declare class LlmService {
    private readonly prisma;
    private lambdaClient;
    constructor(prisma: PrismaService);
    getStructuredQuery(prompt: string): Promise<any>;
    queryTreeFromPrompt(prompt: string): Promise<{
        id: number;
        label: string;
        parentId: number | null;
    }[] | {
        error: string;
    }>;
}
