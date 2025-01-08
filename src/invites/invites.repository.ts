import { Injectable } from "@nestjs/common";

import { InviteStatus } from "@prisma/client";

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

  findInvitesForUser(email: string, loggedInUserId: string) {
    return this.prismaService.invite.findMany({
      where: {
        OR: [{ email }, { createdByUserId: loggedInUserId }],
      },
      include: {
        organization: true,
        createdBy: true,
      },
    });
  }

  findInviteById(id: string) {
    return this.prismaService.invite.findUnique({
      where: {
        id,
      },
    });
  }

  updateInviteStatus(status: InviteStatus, id: string) {
    return this.prismaService.invite.update({
      data: {
        status,
      },
      where: {
        id,
      },
    });
  }

  deleteInvite(id: string) {
    return this.prismaService.invite.delete({
      where: {
        id,
      },
    });
  }
}
