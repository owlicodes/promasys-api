import { BadRequestException, Injectable } from "@nestjs/common";

import { WORK_ITEM_TYPE } from "@prisma/client";

import { CreateWorkItemDto } from "./dtos/create-work-item.dto";
import { UpdateWorkItemDto } from "./dtos/update-work-item.dto";
import { WorkItemsRepository } from "./work-items.repository";

@Injectable()
export class WorkItemsService {
  constructor(private readonly workItemsRepository: WorkItemsRepository) {}

  createWorkItem(data: CreateWorkItemDto, userId: string) {
    if (!data.parentWorkItemId) {
      delete data.parentWorkItemId;
    }

    return this.workItemsRepository.createWorkItem(data, userId);
  }

  findWorkItemsByProjectId(projectId: string, type: WORK_ITEM_TYPE | "ALL") {
    return this.workItemsRepository.findWorkItemsByProjectId(projectId, type);
  }

  findWorkItemById(workItemId: string, type: WORK_ITEM_TYPE | "ALL") {
    return this.workItemsRepository.findWorkItemById(workItemId, type);
  }

  findStoryWorkItemsByProjectId(projectId: string) {
    return this.workItemsRepository.findStoryWorkItemsByProjectId(projectId);
  }

  findBacklogWorkItems(projectId: string) {
    return this.workItemsRepository.findBacklogWorkItems(projectId);
  }

  updateWorkItem(data: UpdateWorkItemDto, workItemId: string) {
    if (!data.parentWorkItemId) {
      delete data.parentWorkItemId;
    }

    return this.workItemsRepository.updateWorkItem(data, workItemId);
  }

  async deleteWorkItem(workItemId: string) {
    const hasChild =
      await this.workItemsRepository.checkIfWorkItemHasChild(workItemId);

    if (hasChild)
      throw new BadRequestException(
        "Cannot delete story, please delete child work items first."
      );

    return this.workItemsRepository.deleteWorkItem(workItemId);
  }
}
