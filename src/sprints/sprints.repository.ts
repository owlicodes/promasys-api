import { Injectable } from "@nestjs/common";

import { SPRINT_STATUS } from "@prisma/client";

import { PrismaService } from "../prisma/prisma.service";
import { CreateSprintDto } from "./dtos/create-sprint.dto";

@Injectable()
export class SprintsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  createSprint(data: CreateSprintDto) {
    return this.prismaService.sprint.create({
      data: {
        ...data,
        status: data.status as SPRINT_STATUS,
      },
    });
  }

  findSprintsByProject(projectId: string) {
    return this.prismaService.sprint.findMany({
      where: {
        projectId,
      },
    });
  }

  updateSprint(sprintId: string, data: CreateSprintDto) {
    return this.prismaService.sprint.update({
      data: {
        ...data,
        status: data.status as SPRINT_STATUS,
      },
      where: {
        id: sprintId,
      },
    });
  }

  deleteSprint(sprintId: string) {
    return this.prismaService.sprint.delete({
      where: {
        id: sprintId,
      },
    });
  }
}
