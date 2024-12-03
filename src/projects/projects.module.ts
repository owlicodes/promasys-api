import { Module } from "@nestjs/common";

import { OrganizationsModule } from "../organizations/organizations.module";
import { PrismaService } from "../prisma/prisma.service";
import { SprintsModule } from "../sprints/sprints.module";
import { ProjectsController } from "./projects.controller";
import { ProjectsRepository } from "./projects.repository";
import { ProjectsService } from "./projects.service";

@Module({
  imports: [OrganizationsModule, SprintsModule],
  controllers: [ProjectsController],
  providers: [ProjectsService, ProjectsRepository, PrismaService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
