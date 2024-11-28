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
}
