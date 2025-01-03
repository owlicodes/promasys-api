import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class OrganizationMembersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findMemberInOrganization(userId: string, organizationId: string) {
    return this.prismaService.organizationMember.findFirst({
      where: {
        userId,
        organizationId,
      },
    });
  }
}
