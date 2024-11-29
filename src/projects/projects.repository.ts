import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ProjectsRepository {
  constructor(private readonly prismaService: PrismaService) {}
}
