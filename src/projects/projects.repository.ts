import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { CreateProjectDto } from "./dtos/create-project.dto";

@Injectable()
export class ProjectsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  createProject(data: CreateProjectDto) {
    return this.prismaService.project.create({
      data: {
        name: data.name,
        description: data.description,
        organization: {
          connect: { id: data.organizationId },
        },
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

  findProjectInOrgByName(organizationId: string, projectName: string) {
    return this.prismaService.project.findFirst({
      where: {
        organizationId,
        name: {
          equals: projectName,
          mode: "insensitive",
        },
      },
    });
  }
}
