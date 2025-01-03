import { Module } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { OrganizationMembersController } from "./organization-members.controller";
import { OrganizationMembersRepository } from "./organization-members.repository";
import { OrganizationMembersService } from "./organization-members.service";

@Module({
  controllers: [OrganizationMembersController],
  providers: [
    OrganizationMembersService,
    OrganizationMembersRepository,
    PrismaService,
  ],
  exports: [OrganizationMembersService],
})
export class OrganizationMembersModule {}
