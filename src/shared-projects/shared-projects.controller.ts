import { Controller } from "@nestjs/common";

import { SharedProjectsService } from "./shared-projects.service";

@Controller({
  path: "shared-projects",
  version: "1",
})
export class SharedProjectsController {
  constructor(private readonly sharedProjectsService: SharedProjectsService) {}
}
