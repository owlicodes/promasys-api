import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { UsersModule } from "src/users/users.module";

import { EnvConfigModule } from "../env-config/env-config.module";
import { EnvConfigService } from "../env-config/env-config.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  imports: [
    EnvConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [EnvConfigModule],
      useFactory: async (envConfigService: EnvConfigService) => ({
        secret: envConfigService.getJwtSecret(),
      }),
      inject: [EnvConfigService],
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
