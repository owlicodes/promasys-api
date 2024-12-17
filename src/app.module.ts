import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";

import { AuthModule } from "./auth/auth.module";
import { EnvironmentVariables, envSchema } from "./env-config/env-config";
import { EnvConfigModule } from "./env-config/env-config.module";
import { EnvConfigService } from "./env-config/env-config.service";
import { HealthModule } from "./health/health.module";
import { OrganizationsModule } from "./organizations/organizations.module";
import { PrismaService } from "./prisma/prisma.service";
import { ProjectsModule } from "./projects/projects.module";
import { SharedProjectsModule } from "./shared-projects/shared-projects.module";
import { SprintsModule } from "./sprints/sprints.module";
import { UsersModule } from "./users/users.module";
import { WorkItemsModule } from "./work-items/work-items.module";

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      imports: [EnvConfigModule],
      inject: [EnvConfigService],
      useFactory: (envConfigService: EnvConfigService) => [
        {
          ttl: envConfigService.getRateLimitTtl(),
          limit: envConfigService.getRateLimit(),
        },
      ],
    }),
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
    AuthModule,
    UsersModule,
    OrganizationsModule,
    ProjectsModule,
    SharedProjectsModule,
    SprintsModule,
    WorkItemsModule,
  ],
  controllers: [],
  providers: [
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
