import { Body, Controller, Post, UseGuards } from "@nestjs/common";

import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CreateSprintDto } from "./dtos/create-sprint.dto";
import { SprintsService } from "./sprints.service";

@UseGuards(JwtAuthGuard)
@Controller({
  path: "sprints",
  version: "1",
})
export class SprintsController {
  constructor(private readonly sprintsService: SprintsService) {}

  @Post("project/:projectId")
  createSprint(@Body() data: CreateSprintDto) {
    return this.sprintsService.createSprint(data);
  }
}
