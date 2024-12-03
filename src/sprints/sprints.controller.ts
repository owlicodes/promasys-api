import { Controller, UseGuards } from "@nestjs/common";

import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { SprintsService } from "./sprints.service";

@UseGuards(JwtAuthGuard)
@Controller({
  path: "sprints",
  version: "1",
})
export class SprintsController {
  constructor(private readonly sprintsService: SprintsService) {}
}
