import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { CreateOrganizationDto } from "./dtos/create-organization.dto";

@Injectable()
export class OrganizationsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  createOrganization(data: CreateOrganizationDto) {
    return this.prismaService.organization.create({
      data,
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
}
