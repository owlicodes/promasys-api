import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";

import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { TUser } from "../types";
import { CreateOrganizationDto } from "./dtos/create-organization.dto";
import { OrganizationsService } from "./organizations.service";

@Controller({
  path: "organizations",
  version: "1",
})
@UseGuards(JwtAuthGuard)
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Get()
  findOrganizations(@Request() req: { user: TUser }) {
    return this.organizationsService.findOrganizations(req.user.id);
  }

  @Post()
  createOrganization(@Body() data: CreateOrganizationDto) {
    return this.organizationsService.createOrganization(data);
  }
}
