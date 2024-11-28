import { Controller, Get, Request, UseGuards } from "@nestjs/common";

import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { TUser } from "../types";
import { OrganizationsService } from "./organizations.service";

@Controller({
  path: "organizations",
  version: "1",
})
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findOrganizations(@Request() req: { user: TUser }) {
    return this.organizationsService.findOrganizations(req.user.id);
  }
}
