import { Module } from "@nestjs/common";

import { OrganizationMembersModule } from "../organization-members/organization-members.module";
import { PrismaService } from "../prisma/prisma.service";
import { UsersModule } from "../users/users.module";
import { InvitesController } from "./invites.controller";
import { InvitesRepository } from "./invites.repository";
import { InvitesService } from "./invites.service";

@Module({
  imports: [UsersModule, OrganizationMembersModule],
  controllers: [InvitesController],
  providers: [InvitesService, InvitesRepository, PrismaService],
  exports: [InvitesService],
})
export class InvitesModule {}
