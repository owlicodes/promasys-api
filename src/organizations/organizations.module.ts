import { Module } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { SharedProjectsModule } from "../shared-projects/shared-projects.module";
import { OrganizationsController } from "./organizations.controller";
import { OrganizationsRepository } from "./organizations.repository";
import { OrganizationsService } from "./organizations.service";

@Module({
  imports: [SharedProjectsModule],
  controllers: [OrganizationsController],
  providers: [OrganizationsService, OrganizationsRepository, PrismaService],
  exports: [OrganizationsService],
})
export class OrganizationsModule {}
