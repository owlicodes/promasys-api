import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { TUser } from "src/types";

import { UsersService } from "../users/users.service";
import { CreateOrganizationMemberDto } from "./dtos/create-organization-member.dto";
import { OrganizationMembersRepository } from "./organization-members.repository";

@Injectable()
export class OrganizationMembersService {
  constructor(
    private readonly organizationMembersRepository: OrganizationMembersRepository,
    private readonly usersService: UsersService
  ) {}

  async createOrganizationMember(
    data: CreateOrganizationMemberDto,
    user: TUser
  ) {
    const userInvited = await this.usersService.findUserByEmail(user.email);
    if (!userInvited)
      throw new NotFoundException("User being invited does not exists.");

    const isMember = await this.findMemberInOrganization(
      user.id,
      data.organizationId
    );
    if (isMember)
      throw new BadRequestException(
        "User is already a member of this organization."
      );

    return this.organizationMembersRepository.createOrganizationMember(
      data,
      user.id
    );
  }

  findMemberInOrganization(userId: string, organizationId: string) {
    return this.organizationMembersRepository.findMemberInOrganization(
      userId,
      organizationId
    );
  }
}
