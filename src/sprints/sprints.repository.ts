import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class SprintsRepository {
  constructor(private readonly prismaService: PrismaService) {}
}
