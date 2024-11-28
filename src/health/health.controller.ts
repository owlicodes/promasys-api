import { Controller, Get } from "@nestjs/common";

import { HealthService } from "./health.service";

@Controller({
  path: "health",
  version: "1",
})
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  checkHealth() {
    return this.healthService.checkHealth();
  }
}
