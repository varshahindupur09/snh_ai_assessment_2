import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateNodeDto } from './dto/create-node.dto';

@Injectable()
export class TreeService {
  constructor(private prisma: PrismaService) {}

  async createNode(data: CreateNodeDto) {
    return this.prisma.treeNode.create({ data });
  }

async getTree(): Promise<any[]> {
  const nodes = await this.prisma.treeNode.findMany();
  const map = new Map<number, any>();
  const roots: any[] = [];

  // First pass: prepare nodes with empty children
  for (const node of nodes) {
    map.set(node.id, { ...node, children: [] });
  }

  // Second pass: build the tree
  for (const node of nodes) {
    const current = map.get(node.id);
    if (node.parentId) {
      const parent = map.get(node.parentId);
      if (parent) {
        parent.children.push(current);
      }
    } else {
      roots.push(current);
    }
  }

  return roots;
}

async getChildrenOfParent(label: string): Promise<any> {
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


}
