import { Module } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { WorkItemsController } from "./work-items.controller";
import { WorkItemsRepository } from "./work-items.repository";
import { WorkItemsService } from "./work-items.service";

@Module({
  controllers: [WorkItemsController],
  providers: [WorkItemsService, WorkItemsRepository, PrismaService],
  exports: [WorkItemsService],
})
export class WorkItemsModule {}
