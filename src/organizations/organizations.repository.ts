import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { CreateOrganizationDto } from "./dtos/create-organization.dto";

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

  findOrganizationByName(name: string) {
    return this.prismaService.organization.findFirst({
      where: {
        name: {
          equals: name,
          mode: "insensitive",
        },
      },
    });
  }

  findOrganizations(userId: string) {
    return this.prismaService.organization.findMany({
      where: {
        ownerId: userId,
      },
      include: {
        owner: true,
      },
    });
  }
}
