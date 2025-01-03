import { Injectable } from "@nestjs/common";

import { OrganizationMembersRepository } from "./organization-members.repository";

@Injectable()
export class OrganizationMembersService {
  constructor(
    private readonly organizationMembersRepository: OrganizationMembersRepository
  ) {}

  findMemberInOrganization(userId: string, organizationId: string) {
    return this.organizationMembersRepository.findMemberInOrganization(
      userId,
      organizationId
    );
  }
}
