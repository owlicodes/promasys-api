import { Controller, Get, Query, UseGuards } from "@nestjs/common";

import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { InvitesService } from "./invites.service";

@UseGuards(JwtAuthGuard)
@Controller({
  path: "invites",
  version: "1",
})
export class InvitesController {
  constructor(private readonly invitesService: InvitesService) {}

  @Get()
  findInvitesForUser(@Query("email") email: string) {
    return this.invitesService.findInvitesForUser(email);
  }
}
