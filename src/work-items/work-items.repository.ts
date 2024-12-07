import { Injectable } from "@nestjs/common";

import { WORK_ITEM_STATUS, WORK_ITEM_TYPE } from "@prisma/client";

import { PrismaService } from "../prisma/prisma.service";
import { CreateWorkItemDto } from "./dtos/create-work-item.dto";

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
      },
    });
  }
}
