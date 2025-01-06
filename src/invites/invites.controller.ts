import {
  Controller,
  Get,
  Param,
  Patch,
  Query,
  Request,
  UseGuards,
} from "@nestjs/common";

import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { TUser } from "../types";
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

  @Patch("decline/:inviteId")
  declineInvite(
    @Param("inviteId") inviteId: string,
    @Request() req: { user: TUser }
  ) {
    return this.invitesService.declineInvite(inviteId, req.user);
  }
}
