import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { EnvironmentVariables, envSchema } from "./env-config/env-config";
import { EnvConfigModule } from "./env-config/env-config.module";
import { HealthModule } from "./health/health.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (config: Record<string, unknown>) => {
        const result = envSchema.safeParse(config);

        if (!result.success) {
          throw new Error(
            `Config validation error: ${result.error.toString()}`
          );
        }

        return result.data as EnvironmentVariables;
      },
      validationOptions: {
        allowUnknown: false,
        abortEarly: true,
      },
      isGlobal: true,
    }),
    EnvConfigModule,
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
