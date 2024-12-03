import { Injectable } from "@nestjs/common";

import { WorkItemsRepository } from "./work-items.repository";

@Injectable()
export class WorkItemsService {
  constructor(private readonly workItemsRepository: WorkItemsRepository) {}
}
