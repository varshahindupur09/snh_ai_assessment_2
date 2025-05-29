"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LlmService = void 0;
const common_1 = require("@nestjs/common");
const client_lambda_1 = require("@aws-sdk/client-lambda");
const prisma_service_1 = require("../../prisma/prisma.service");
let LlmService = class LlmService {
    prisma;
    lambdaClient = new client_lambda_1.LambdaClient({ region: 'us-east-1' });
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getStructuredQuery(prompt) {
        const payload = JSON.stringify({ prompt });
        console.log('📨 Sending prompt to Lambda:', prompt);
        const command = new client_lambda_1.InvokeCommand({
            FunctionName: 'bedrock-nlp-query-handler',
            Payload: new TextEncoder().encode(payload),
        });
        const response = await this.lambdaClient.send(command);
        const rawPayload = new TextDecoder().decode(response.Payload);
        console.log('🧾 Raw Lambda response:', rawPayload);
        try {
            const parsed = JSON.parse(rawPayload);
            if (parsed.structuredFilters?.root) {
                const value = parsed.structuredFilters.root;
                if (value === 'all') {
                    parsed.structuredFilters.parent = 'root';
                }
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
            const match = rawPayload.match(/{[^}]*"parent"\s*:\s*"[^"]+"[^}]*}/);
            if (match) {
                return JSON.parse(match[0]);
            }
            return null;
        }
        catch (err) {
            console.error('❌ Failed to parse Lambda output:', err);
            return null;
        }
    }
    async queryTreeFromPrompt(prompt) {
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
};
exports.LlmService = LlmService;
exports.LlmService = LlmService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LlmService);
//# sourceMappingURL=llm.service.js.map