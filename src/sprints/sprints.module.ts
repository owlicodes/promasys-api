import { Module } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { SprintsController } from "./sprints.controller";
import { SprintsRepository } from "./sprints.repository";
import { SprintsService } from "./sprints.service";

@Module({
  controllers: [SprintsController],
  providers: [SprintsService, SprintsRepository, PrismaService],
  exports: [SprintsService],
})
export class SprintsModule {}
