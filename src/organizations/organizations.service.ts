import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { SharedProjectsService } from "../shared-projects/shared-projects.service";
import { CreateOrganizationDto } from "./dtos/create-organization.dto";
import { UpdateOrganizationDto } from "./dtos/update-organization.dto";
import { OrganizationsRepository } from "./organizations.repository";

@Injectable()
export class OrganizationsService {
  constructor(
    private readonly organizationsRepository: OrganizationsRepository,
    private readonly sharedProjectsService: SharedProjectsService
  ) {}

  async createOrganization(data: CreateOrganizationDto, ownerId: string) {
    const organization = await this.findOrganizationByName(data.name, ownerId);
    if (organization)
      throw new BadRequestException(
        "Organization with the same name already exists."
      );
    return this.organizationsRepository.createOrganization(data);
  }

  findOrganizationByName(name: string, ownerId: string) {
    return this.organizationsRepository.findOrganizationByName(name, ownerId);
  }

  findOrganizations(userId: string) {
    return this.organizationsRepository.findOrganizations(userId);
  }

  findOrgMember(userId: string, organizationId: string) {
    return this.organizationsRepository.findOrgMember(userId, organizationId);
  }

  findOrganizationById(organizationId: string) {
    return this.organizationsRepository.findOrganizationById(organizationId);
  }

  async updateOrganization(
    organizationId: string,
    data: UpdateOrganizationDto
  ) {
    const organizationToUpdate =
      await this.findOrganizationById(organizationId);
    if (!organizationToUpdate)
      throw new NotFoundException("Organization does not exists.");

    const organization =
      await this.organizationsRepository.findOrganizationByName(
        data.name,
        data.ownerId
      );
    if (organization && organization.name !== organizationToUpdate.name)
      throw new BadRequestException(
        "An organization with the same name already exists."
      );

    return this.organizationsRepository.updateOrganization(
      organizationId,
      data
    );
  }

  async deleteOrganization(userId: string, organizationId: string) {
    const organizationToUpdate =
      await this.findOrganizationById(organizationId);
    if (!organizationToUpdate)
      throw new NotFoundException("Organization does not exists.");

    const projects = await this.sharedProjectsService.findProjectsByUserAndOrg(
      userId,
      organizationId
    );
    if (projects?.length > 0)
      throw new BadRequestException(
        "Unable to delete organization, there are projects found in this organization."
      );

    return this.organizationsRepository.deleteOrganization(organizationId);
  }
}
