import { Module } from '@nestjs/common';
import { TreeService } from './tree.service';
import { TreeController } from './tree.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [TreeController],
  providers: [TreeService, PrismaService],
})
export class TreeModule {}
