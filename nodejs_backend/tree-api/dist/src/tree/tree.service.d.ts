import { PrismaService } from '../../prisma/prisma.service';
import { CreateNodeDto } from './dto/create-node.dto';
export declare class TreeService {
    private prisma;
    constructor(prisma: PrismaService);
    createNode(data: CreateNodeDto): Promise<{
        id: number;
        label: string;
        parentId: number | null;
    }>;
    getTree(): Promise<any[]>;
}
