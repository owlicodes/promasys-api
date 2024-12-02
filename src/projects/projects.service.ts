import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { OrganizationsService } from "../organizations/organizations.service";
import { CreateProjectDto } from "./dtos/create-project.dto";
import { ProjectsRepository } from "./projects.repository";

@Injectable()
export class ProjectsService {
  constructor(
    private readonly projectsRepository: ProjectsRepository,
    private readonly organizationsService: OrganizationsService
  ) {}

  async createProject(data: CreateProjectDto) {
    const organization = await this.organizationsService.findOrganizationById(
      data.organizationId
    );
    if (!organization)
      throw new NotFoundException("Organization does not exists.");

    const project = await this.findProjectInOrgByName(
      data.organizationId,
      data.name
    );
    if (project)
      throw new BadRequestException(
        "Project with the same name already exists in this organization."
      );

    return this.projectsRepository.createProject(data);
  }

  findProjectInOrgByName(organizationId: string, projectName: string) {
    return this.projectsRepository.findProjectInOrgByName(
      organizationId,
      projectName
    );
  }

  findProjectsByUserAndOrg(userId: string, organizationId: string) {
    return this.projectsRepository.findProjectsByUserAndOrg(
      userId,
      organizationId
    );
  }
}
