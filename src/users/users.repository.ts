import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto } from "./dtos/create-user.dto";

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findUserByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  createUser(data: CreateUserDto) {
    return this.prismaService.user.create({
      data,
    });
  }
}
