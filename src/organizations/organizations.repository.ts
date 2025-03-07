import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { CreateOrganizationDto } from "./dtos/create-organization.dto";
import { UpdateOrganizationDto } from "./dtos/update-organization.dto";

@Injectable()
export class OrganizationsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  createOrganization(data: CreateOrganizationDto) {
    return this.prismaService.organization.create({
      data: {
        name: data.name,
        description: data.description,
        owner: {
          connect: { id: data.ownerId },
        },
        members: {
          create: {
            user: {
              connect: {
                id: data.ownerId,
              },
            },
          },
        },
      },
    });
  }

  findOrganizationById(organizationId: string) {
    return this.prismaService.organization.findUnique({
      where: {
        id: organizationId,
      },
    });
  }

  findOrganizationByName(name: string, ownerId: string) {
    return this.prismaService.organization.findFirst({
      where: {
        name: {
          equals: name,
          mode: "insensitive",
        },
        ownerId,
      },
    });
  }

  findOrganizations(userId: string) {
    return this.prismaService.organization.findMany({
      where: {
        OR: [
          { ownerId: userId },
          {
            members: {
              some: {
                userId,
              },
            },
          },
        ],
      },
      include: {
        owner: true,
      },
    });
  }

  findOrgMember(userId: string, organizationId: string) {
    return this.prismaService.organizationMember.findFirst({
      where: {
        userId,
        organizationId,
      },
    });
  }

  updateOrganization(organizationId: string, data: UpdateOrganizationDto) {
    return this.prismaService.organization.update({
      data,
      where: {
        id: organizationId,
      },
    });
  }

  deleteOrganization(organizationId: string) {
    return this.prismaService.organization.delete({
      where: {
        id: organizationId,
      },
    });
  }
}
