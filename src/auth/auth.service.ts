import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { UsersService } from "../users/users.service";
import { GoogleUserDto } from "./dtos/google-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async googleSignIn(data: GoogleUserDto) {
    let user = await this.usersService.findUserByEmail(data.email);

    if (!user) {
      user = await this.usersService.createUser(data);
    }

    return this.signIn({
      id: user.id,
      email: user.email,
      name: user.name,
    });
  }

  async signIn(user: { id: string; name: string; email: string }) {
    const payload = user;

    return {
      ...user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
