import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { CreateInviteDto } from "./dtos/create-invite.dto";

@Injectable()
export class InvitesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  createInvite(data: CreateInviteDto, userId: string, organizationId: string) {
    return this.prismaService.invite.create({
      data: {
        email: data.email,
        createdByUserId: userId,
        organizationId: organizationId,
      },
    });
  }

  findPendingInviteForUser(email: string) {
    return this.prismaService.invite.findFirst({
      where: {
        email,
      },
    });
  }
}
