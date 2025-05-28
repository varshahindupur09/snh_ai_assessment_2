import { TreeService } from './tree.service';
import { CreateNodeDto } from './dto/create-node.dto';
export declare class TreeController {
    private readonly treeService;
    constructor(treeService: TreeService);
    create(body: CreateNodeDto): Promise<{
        id: number;
        label: string;
        parentId: number | null;
    }>;
    findAll(): Promise<any[]>;
}
