import { Module } from "@nestjs/common";

import { EnvConfigModule } from "../env-config/env-config.module";
import { OpenaiController } from "./openai.controller";
import { OpenaiService } from "./openai.service";

@Module({
  imports: [EnvConfigModule],
  controllers: [OpenaiController],
  providers: [OpenaiService],
})
export class OpenaiModule {}
