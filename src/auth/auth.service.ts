import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { OAuth2Client } from "google-auth-library";
import { OrganizationsService } from "src/organizations/organizations.service";

import { EnvConfigService } from "../env-config/env-config.service";
import { UsersService } from "../users/users.service";
import { GoogleUserDto } from "./dtos/google-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly envConfigService: EnvConfigService,
    private readonly organizationsService: OrganizationsService
  ) {}

  async googleSignIn(data: GoogleUserDto) {
    const client = new OAuth2Client(this.envConfigService.getGoogleClientId());

    try {
      const ticket = await client.verifyIdToken({
        idToken: data.idToken,
        audience: this.envConfigService.getGoogleClientId(),
      });

      const payload = ticket.getPayload();

      if (payload.email !== data.email || payload.name !== data.name) {
        throw new UnauthorizedException("Google token authentication failed.");
      }

      let user = await this.usersService.findUserByEmail(data.email);
      if (!user) {
        user = await this.usersService.createUser({
          email: payload.email,
          name: payload.name,
          googleId: payload.sub,
        });

        await this.organizationsService.createOrganization(
          {
            name: `${payload.name} Default`,
            description: "Default organization",
            ownerId: user.id,
          },
          user.id
        );
      }

      return this.signIn({
        id: user.id,
        email: user.email,
        name: user.name,
      });
    } catch {
      throw new UnauthorizedException("Invalid google authentication.");
    }
  }

  async signIn(user: { id: string; name: string; email: string }) {
    const payload = user;

    return {
      ...user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
