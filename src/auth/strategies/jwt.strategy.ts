import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";

import { ExtractJwt, Strategy } from "passport-jwt";

import { EnvConfigService } from "../../env-config/env-config.service";
import { TUser } from "../../types";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly envConfigService: EnvConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: envConfigService.getJwtSecret(),
    });
  }

  async validate(payload: TUser) {
    return payload;
  }
}
