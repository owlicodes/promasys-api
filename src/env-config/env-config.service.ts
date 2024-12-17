import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { EnvironmentVariables } from "./env-config";

@Injectable()
export class EnvConfigService {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>
  ) {}

  getPort(): string {
    return this.configService.get<number>("PORT", { infer: true })!;
  }

  getJwtSecret(): string {
    return this.configService.get<string>("JWT_SECRET", { infer: true })!;
  }

  getGoogleClientId(): string {
    return this.configService.get<string>("GOOGLE_CLIENT_ID", { infer: true })!;
  }

  getGoogleClientSecret(): string {
    return this.configService.get<string>("GOOGLE_CLIENT_SECRET", {
      infer: true,
    })!;
  }

  getRateLimitTtl(): number {
    return this.configService.get<number>("RATE_LIMIT_TTL", {
      infer: true,
    })!;
  }

  getRateLimit(): number {
    return this.configService.get<number>("RATE_LIMIT", {
      infer: true,
    })!;
  }
}
