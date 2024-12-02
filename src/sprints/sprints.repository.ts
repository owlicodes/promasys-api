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
}
