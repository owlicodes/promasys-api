import { Body, Controller, Post, UseGuards } from "@nestjs/common";

import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

import { CreateProjectDto } from "./dtos/create-project.dto";
import { ProjectsService } from "./projects.service";

@UseGuards(JwtAuthGuard)
@Controller({
  path: "projects",
  version: "1",
})
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  createProject(@Body() data: CreateProjectDto) {
    return this.projectsService.createProject(data);
  }
}
