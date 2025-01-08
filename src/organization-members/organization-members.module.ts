import { Module } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { UsersModule } from "../users/users.module";
import { OrganizationMembersController } from "./organization-members.controller";
import { OrganizationMembersRepository } from "./organization-members.repository";
import { OrganizationMembersService } from "./organization-members.service";

@Module({
  imports: [UsersModule],
  controllers: [OrganizationMembersController],
  providers: [
    OrganizationMembersService,
    OrganizationMembersRepository,
    PrismaService,
  ],
  exports: [OrganizationMembersService],
})
export class OrganizationMembersModule {}
