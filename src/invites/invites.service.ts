import { BadRequestException, Injectable } from "@nestjs/common";

import { OrganizationMembersService } from "../organization-members/organization-members.service";
import { UsersService } from "../users/users.service";
import { CreateInviteDto } from "./dtos/create-invite.dto";
import { InvitesRepository } from "./invites.repository";

@Injectable()
export class InvitesService {
  constructor(
    private readonly invitesRepository: InvitesRepository,
    private readonly usersService: UsersService,
    private readonly organizationMembersService: OrganizationMembersService
  ) {}

  async createInvite(
    data: CreateInviteDto,
    userId: string,
    organizationId: string
  ) {
    const invitedUser = await this.usersService.findUserByEmail(data.email);
    if (invitedUser) {
      const isMemberAlready =
        await this.organizationMembersService.findMemberInOrganization(
          invitedUser.id,
          organizationId
        );

      if (isMemberAlready)
        throw new BadRequestException(
          "This user is already a member of this organization."
        );
    }

    const pendingInvite = await this.findPendingInviteForUser(data.email);
    if (pendingInvite)
      throw new BadRequestException(
        "There is already a pending invite for this user."
      );

    return this.invitesRepository.createInvite(data, userId, organizationId);
  }

  findPendingInviteForUser(email: string) {
    return this.invitesRepository.findPendingInviteForUser(email);
  }

  findInvitesForUser(email: string) {
    return this.invitesRepository.findInvitesForUser(email);
  }
}
