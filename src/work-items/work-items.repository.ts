import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class WorkItemsRepository {
  constructor(private readonly prismaService: PrismaService) {}
}
