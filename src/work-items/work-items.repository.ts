import { Injectable } from "@nestjs/common";

import { WORK_ITEM_STATUS, WORK_ITEM_TYPE } from "@prisma/client";

import { PrismaService } from "../prisma/prisma.service";
import { CreateWorkItemDto } from "./dtos/create-work-item.dto";
import { UpdateWorkItemDto } from "./dtos/update-work-item.dto";

@Injectable()
export class WorkItemsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  createWorkItem(data: CreateWorkItemDto, userId: string) {
    return this.prismaService.workItem.create({
      data: {
        ...data,
        type: data.type as WORK_ITEM_TYPE,
        status: data.status as WORK_ITEM_STATUS,
        createdByUserId: userId,
        assignedToUserId: data.assignedToUserId || userId,
      },
    });
  }

  findWorkItemsByProjectId(projectId: string, type: WORK_ITEM_TYPE | "ALL") {
    return this.prismaService.workItem.findMany({
      where: {
        projectId,
        ...(type && type !== "ALL" ? { type } : {}),
      },
      include: {
        sprint: true,
      },
    });
  }

  findWorkItemById(workItemId: string, type: WORK_ITEM_TYPE | "ALL") {
    return this.prismaService.workItem.findFirst({
      where: {
        id: workItemId,
      },
      include: {
        childWorkItems: {
          where: {
            ...(type && type !== "ALL" ? { type } : {}),
          },
          include: {
            sprint: true,
          },
        },
      },
    });
  }

  findStoryWorkItemsByProjectId(projectId: string) {
    return this.prismaService.workItem.findMany({
      where: {
        projectId,
        type: "STORY",
      },
    });
  }

  findBacklogWorkItems(projectId: string) {
    return this.prismaService.workItem.findMany({
      where: {
        projectId,
        status: "PENDING",
        sprint: null,
        // OR: [{ sprintId: null }, { sprintId: undefined }],
      },
      include: {
        sprint: true,
      },
    });
  }

  checkIfWorkItemHasChild(workItemId: string) {
    return this.prismaService.workItem.findFirst({
      where: {
        parentWorkItemId: workItemId,
      },
    });
  }

  updateWorkItem(data: UpdateWorkItemDto, workItemId: string) {
    return this.prismaService.workItem.update({
      data: {
        ...data,
        type: data.type as WORK_ITEM_TYPE,
        status: data.status as WORK_ITEM_STATUS,
      },
      where: {
        id: workItemId,
      },
    });
  }

  deleteWorkItem(workItemId: string) {
    return this.prismaService.workItem.delete({
      where: {
        id: workItemId,
      },
    });
  }
}
