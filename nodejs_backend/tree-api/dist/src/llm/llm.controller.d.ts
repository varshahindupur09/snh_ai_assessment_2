import { LlmService } from './llm.service';
import { LlmQueryDto } from './dto/llm-query.dto';
export declare class LlmController {
    private readonly llmService;
    constructor(llmService: LlmService);
    getStructuredQuery(dto: LlmQueryDto): Promise<{
        id: number;
        label: string;
        parentId: number | null;
    }[] | {
        error: string;
    }>;
}
