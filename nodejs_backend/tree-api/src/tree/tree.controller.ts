import { Controller, Post, Get, Body } from '@nestjs/common';
import { TreeService } from './tree.service';
import { CreateNodeDto } from './dto/create-node.dto';

@Controller('api/tree')
export class TreeController {
  constructor(private readonly treeService: TreeService) {}

  @Post()
  create(@Body() body: CreateNodeDto) {
    return this.treeService.createNode(body);
  }

  @Get()
  findAll() {
    return this.treeService.getTree();
  }
}
