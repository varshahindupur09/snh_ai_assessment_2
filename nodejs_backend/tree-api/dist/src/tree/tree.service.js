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
exports.TreeService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let TreeService = class TreeService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createNode(data) {
        return this.prisma.treeNode.create({ data });
    }
    async getTree() {
        const nodes = await this.prisma.treeNode.findMany();
        const map = new Map();
        const roots = [];
        for (const node of nodes) {
            map.set(node.id, { ...node, children: [] });
        }
        for (const node of nodes) {
            const current = map.get(node.id);
            if (node.parentId) {
                const parent = map.get(node.parentId);
                if (parent) {
                    parent.children.push(current);
                }
            }
            else {
                roots.push(current);
            }
        }
        return roots;
    }
    async getChildrenOfParent(label) {
        const parent = await this.prisma.treeNode.findFirst({
            where: { label },
        });
        if (!parent) {
            return { error: `No node found for label "${label}"` };
        }
        const children = await this.prisma.treeNode.findMany({
            where: { parentId: parent.id },
        });
        return children;
    }
};
exports.TreeService = TreeService;
exports.TreeService = TreeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TreeService);
//# sourceMappingURL=tree.service.js.map