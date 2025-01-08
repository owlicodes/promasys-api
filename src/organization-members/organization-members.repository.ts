import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { CreateOrganizationMemberDto } from "./dtos/create-organization-member.dto";

@Injectable()
export class OrganizationMembersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  createOrganizationMember(data: CreateOrganizationMemberDto, userId: string) {
    return this.prismaService.organizationMember.create({
      data: {
        organizationId: data.organizationId,
        userId,
      },
    });
  }

  findMemberInOrganization(userId: string, organizationId: string) {
    return this.prismaService.organizationMember.findFirst({
      where: {
        userId,
        organizationId,
      },
    });
  }
}
