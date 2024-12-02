import { Module } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { ProjectsRepository } from "../projects/projects.repository";
import { SharedProjectsController } from "./shared-projects.controller";
import { SharedProjectsService } from "./shared-projects.service";

@Module({
  controllers: [SharedProjectsController],
  providers: [SharedProjectsService, ProjectsRepository, PrismaService],
  exports: [SharedProjectsService],
})
export class SharedProjectsModule {}
