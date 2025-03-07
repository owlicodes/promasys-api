import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";

import { TUser } from "src/types";

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

  async acceptInvite(id: string, user: TUser) {
    const invite = await this.findInviteById(id);

    if (!invite) throw new NotFoundException("Invite does not exists.");
    if (invite.email !== user.email)
      throw new UnauthorizedException(
        "You are not authorized to accept this invite."
      );
    if (invite.status !== "PENDING")
      throw new BadRequestException(
        "This invite is not in pending state anymore."
      );

    await this.organizationMembersService.createOrganizationMember(
      {
        organizationId: invite.organizationId,
      },
      user
    );

    return this.invitesRepository.updateInviteStatus("ACCEPTED", id);
  }

  findPendingInviteForUser(email: string) {
    return this.invitesRepository.findPendingInviteForUser(email);
  }

  findInvitesForUser(email: string, loggedInUserId: string) {
    return this.invitesRepository.findInvitesForUser(email, loggedInUserId);
  }

  findInviteById(id: string) {
    return this.invitesRepository.findInviteById(id);
  }

  async declineInvite(id: string, user: TUser) {
    const invite = await this.findInviteById(id);

    if (!invite) throw new NotFoundException("Invite does not exists.");
    if (invite.email !== user.email)
      throw new UnauthorizedException(
        "You are not authorized to decline this invite."
      );
    if (invite.status !== "PENDING")
      throw new BadRequestException(
        "This invite is not in pending state anymore."
      );

    return this.invitesRepository.updateInviteStatus("DECLINED", id);
  }

  async deleteInvite(id: string, user: TUser) {
    const invite = await this.findInviteById(id);

    if (!invite) throw new NotFoundException("Invite does not exists.");
    if (invite.email !== user.email && invite.createdByUserId !== user.id)
      throw new UnauthorizedException(
        "You are not authorized to delete this invite."
      );

    return this.invitesRepository.deleteInvite(id);
  }
}
