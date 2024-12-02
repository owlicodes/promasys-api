import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";

import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { IsOrgMember } from "../organizations/guards/is-org-member.guard";
import { TUser } from "../types";
import { CreateProjectDto } from "./dtos/create-project.dto";
import { UpdateProjectDto } from "./dtos/update-project-dto";
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

  @Get(":organizationId")
  findProjectsByUserAndOrg(
    @Request() req: { user: TUser },
    @Param("organizationId") organizationId: string
  ) {
    return this.projectsService.findProjectsByUserAndOrg(
      req.user.id,
      organizationId
    );
  }

  @UseGuards(IsOrgMember)
  @Patch(":projectId/organization/:organizationId")
  updateProject(
    @Param("projectId") projectId: string,
    @Body() data: UpdateProjectDto
  ) {
    return this.projectsService.updateProject(projectId, data);
  }
}
