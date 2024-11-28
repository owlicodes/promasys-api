import { BadRequestException, Injectable } from "@nestjs/common";

import { CreateOrganizationDto } from "./dtos/create-organization.dto";
import { OrganizationsRepository } from "./organizations.repository";

@Injectable()
export class OrganizationsService {
  constructor(
    private readonly organizationsRepository: OrganizationsRepository
  ) {}

  async createOrganization(data: CreateOrganizationDto) {
    const organization = await this.findOrganizationByName(data.name);
    if (organization)
      throw new BadRequestException(
        "Organization with the same name already exists."
      );
    return this.organizationsRepository.createOrganization(data);
  }

  findOrganizationByName(name: string) {
    return this.organizationsRepository.findOrganizationByName(name);
  }
}
