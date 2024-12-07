import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";

import { CreateSprintDto } from "src/sprints/dtos/create-sprint.dto";

import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { IsOrgMember } from "../organizations/guards/is-org-member.guard";
import { SprintsService } from "../sprints/sprints.service";
import { TUser } from "../types";
import { CreateWorkItemDto } from "../work-items/dtos/create-work-item.dto";
import { WorkItemsService } from "../work-items/work-items.service";
import { CreateProjectDto } from "./dtos/create-project.dto";
import { UpdateProjectDto } from "./dtos/update-project-dto";
import { IsProjectMember } from "./guards/is-project-member.guard";
import { ProjectsService } from "./projects.service";

@UseGuards(JwtAuthGuard)
@Controller({
  path: "projects",
  version: "1",
})
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly sprintsService: SprintsService,
    private readonly workItemsService: WorkItemsService
  ) {}

  @Post()
  createProject(@Body() data: CreateProjectDto) {
    return this.projectsService.createProject(data);
  }

  @Get("/organization/:organizationId")
  findProjectsByUserAndOrg(
    @Request() req: { user: TUser },
    @Param("organizationId") organizationId: string
  ) {
    return this.projectsService.findProjectsByUserAndOrg(
      req.user.id,
      organizationId
    );
  }

  @Get(":projectId")
  findProjectById(@Param("projectId") projectId: string) {
    return this.projectsService.findProjectById(projectId, true);
  }

  @UseGuards(IsOrgMember)
  @Patch(":projectId/organization/:organizationId")
  updateProject(
    @Param("projectId") projectId: string,
    @Body() data: UpdateProjectDto
  ) {
    return this.projectsService.updateProject(projectId, data);
  }

  @UseGuards(IsOrgMember)
  @Delete(":projectId")
  deleteProject(@Param("projectId") projectId: string) {
    return this.projectsService.deleteProject(projectId);
  }

  // Sprint Related Routes
  @UseGuards(IsProjectMember)
  @Post(":projectId/sprints")
  createProjectSprint(@Body() data: CreateSprintDto) {
    return this.sprintsService.createSprint(data);
  }

  @UseGuards(IsProjectMember)
  @Get(":projectId/sprints")
  findProjectSprints(@Param("projectId") projectId: string) {
    return this.sprintsService.findSprintsByProject(projectId);
  }

  @UseGuards(IsProjectMember)
  @Get(":projectId/sprints/:sprintId")
  findSprintById(@Param("sprintId") sprintId: string) {
    return this.sprintsService.findSprintById(sprintId);
  }

  @UseGuards(IsProjectMember)
  @Patch(":projectId/sprints/:sprintId")
  updateProjectSprint(
    @Param("sprintId") sprintId: string,
    @Body() data: CreateSprintDto
  ) {
    return this.sprintsService.updateSprint(sprintId, data);
  }

  @UseGuards(IsProjectMember)
  @Delete(":projectId/sprints/:sprintId")
  deleteProjectSprint(@Param("sprintId") sprintId: string) {
    return this.sprintsService.deleteSprint(sprintId);
  }

  // Work Item Related Routes
  @UseGuards(IsProjectMember)
  @Post(":projectId/work-items")
  createWorkItem(
    @Body() data: CreateWorkItemDto,
    @Request() req: { user: TUser }
  ) {
    return this.workItemsService.createWorkItem(data, req.user.id);
  }
}
