import { Controller } from "@nestjs/common";

import { SprintsService } from "./sprints.service";

@Controller({
  path: "sprints",
  version: "1",
})
export class SprintsController {
  constructor(private readonly sprintsService: SprintsService) {}
}
