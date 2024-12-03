import { Controller } from "@nestjs/common";

import { WorkItemsService } from "./work-items.service";

@Controller({
  path: "work-items",
  version: "1",
})
export class WorkItemsController {
  constructor(private readonly workItemsService: WorkItemsService) {}
}
