import { Module } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { OrganizationsController } from "./organizations.controller";
import { OrganizationsRepository } from "./organizations.repository";
import { OrganizationsService } from "./organizations.service";

@Module({
  controllers: [OrganizationsController],
  providers: [OrganizationsService, OrganizationsRepository, PrismaService],
  exports: [OrganizationsService],
})
export class OrganizationsModule {}
