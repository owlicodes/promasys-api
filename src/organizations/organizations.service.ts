import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { CreateOrganizationDto } from "./dtos/create-organization.dto";
import { UpdateOrganizationDto } from "./dtos/update-organization.dto";
import { OrganizationsRepository } from "./organizations.repository";

@Injectable()
export class OrganizationsService {
  constructor(
    private readonly organizationsRepository: OrganizationsRepository
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

  async updateOrganization(
    organizationId: string,
    data: UpdateOrganizationDto
  ) {
    const organizationToUpdate =
      await this.organizationsRepository.findOrganizationById(organizationId);
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

  deleteOrganization(organizationId: string) {
    return this.organizationsRepository.deleteOrganization(organizationId);
  }
}
