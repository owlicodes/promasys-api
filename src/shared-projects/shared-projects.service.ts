import { Injectable } from "@nestjs/common";

import { ProjectsRepository } from "../projects/projects.repository";

@Injectable()
export class SharedProjectsService {
  constructor(private readonly projectsRepository: ProjectsRepository) {}

  findProjectsByUserAndOrg(userId: string, organizationId: string) {
    return this.projectsRepository.findProjectsByUserAndOrg(
      userId,
      organizationId
    );
  }
}
