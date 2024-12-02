import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { CreateProjectDto } from "./dtos/create-project.dto";
import { UpdateProjectDto } from "./dtos/update-project-dto";

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

  findProjectsByUserAndOrg(userId: string, organizationId: string) {
    return this.prismaService.project.findMany({
      where: {
        organizationId,
        OR: [{ ownerId: userId }, { members: { some: { userId } } }],
      },
      include: {
        owner: true,
      },
    });
  }

  findProjectById(projectId: string) {
    return this.prismaService.project.findFirst({
      where: {
        id: projectId,
      },
    });
  }

  updateProject(projectId: string, data: UpdateProjectDto) {
    return this.prismaService.project.update({
      data,
      where: {
        id: projectId,
      },
    });
  }

  deleteProject(projectId: string) {
    return this.prismaService.project.delete({
      where: {
        id: projectId,
      },
    });
  }
}
