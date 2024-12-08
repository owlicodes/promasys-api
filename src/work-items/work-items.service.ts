import { Injectable } from "@nestjs/common";

import { CreateWorkItemDto } from "./dtos/create-work-item.dto";
import { WorkItemsRepository } from "./work-items.repository";

@Injectable()
export class WorkItemsService {
  constructor(private readonly workItemsRepository: WorkItemsRepository) {}

  createWorkItem(data: CreateWorkItemDto, userId: string) {
    return this.workItemsRepository.createWorkItem(data, userId);
  }

  findWorkItemsByProjectId(projectId: string) {
    return this.workItemsRepository.findWorkItemsByProjectId(projectId);
  }

  findWorkItemById(workItemId: string) {
    return this.workItemsRepository.findWorkItemById(workItemId);
  }
}
