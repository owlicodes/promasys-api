import {
  Controller,
  Delete,
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
  findInvitesForUser(
    @Query("email") email: string,
    @Request() req: { user: TUser }
  ) {
    return this.invitesService.findInvitesForUser(email, req.user.id);
  }

  @Patch("accept/:inviteId")
  acceptInvite(
    @Param("inviteId") inviteId: string,
    @Request() req: { user: TUser }
  ) {
    return this.invitesService.acceptInvite(inviteId, req.user);
  }

  @Patch("decline/:inviteId")
  declineInvite(
    @Param("inviteId") inviteId: string,
    @Request() req: { user: TUser }
  ) {
    return this.invitesService.declineInvite(inviteId, req.user);
  }

  @Delete(":inviteId")
  deleteInvite(
    @Param("inviteId") inviteId: string,
    @Request() req: { user: TUser }
  ) {
    return this.invitesService.deleteInvite(inviteId, req.user);
  }
}
