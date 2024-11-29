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

import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { TUser } from "../types";
import { CreateOrganizationDto } from "./dtos/create-organization.dto";
import { UpdateOrganizationDto } from "./dtos/update-organization.dto";
import { IsOrgMember } from "./guards/is-org-member.guard";
import { OrganizationsService } from "./organizations.service";

@UseGuards(JwtAuthGuard)
@Controller({
  path: "organizations",
  version: "1",
})
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Post()
  createOrganization(
    @Body() data: CreateOrganizationDto,
    @Request() req: { user: TUser }
  ) {
    return this.organizationsService.createOrganization(data, req.user.id);
  }

  @Get()
  findOrganizations(@Request() req: { user: TUser }) {
    return this.organizationsService.findOrganizations(req.user.id);
  }

  @UseGuards(IsOrgMember)
  @Patch(":organizationId")
  updateOrganization(
    @Param("organizationId") organizationId: string,
    @Body() data: UpdateOrganizationDto
  ) {
    return this.organizationsService.updateOrganization(organizationId, data);
  }

  @UseGuards(IsOrgMember)
  @Delete(":organizationId")
  deleteOrganization(@Param("organizationId") organizationId: string) {
    return this.organizationsService.deleteOrganization(organizationId);
  }
}
