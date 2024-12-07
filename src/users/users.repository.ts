import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto } from "./dtos/create-user.dto";

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  createUser(data: CreateUserDto) {
    return this.prismaService.user.create({
      data,
    });
  }

  findUserByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  findUsersByProject(projectId: string) {
    return this.prismaService.user.findMany({
      where: {
        projects: {
          some: {
            projectId,
          },
        },
      },
    });
  }
}
