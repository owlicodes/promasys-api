import { BadRequestException, Injectable } from "@nestjs/common";

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

  findWorkItemsByProjectId(projectId: string) {
    return this.workItemsRepository.findWorkItemsByProjectId(projectId);
  }

  findWorkItemById(workItemId: string) {
    return this.workItemsRepository.findWorkItemById(workItemId);
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
