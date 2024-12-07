import { Injectable } from "@nestjs/common";

import { CreateUserDto } from "./dtos/create-user.dto";
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  findUserByEmail(email: string) {
    return this.usersRepository.findUserByEmail(email);
  }

  findUsersByProject(projectId: string) {
    return this.usersRepository.findUsersByProject(projectId);
  }

  createUser(data: CreateUserDto) {
    return this.usersRepository.createUser(data);
  }
}
