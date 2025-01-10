import { Body, Controller, Post, UseGuards } from "@nestjs/common";

import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { PromptDto } from "./dtos/prompt.dto";
import { OpenaiService } from "./openai.service";

@UseGuards(JwtAuthGuard)
@Controller({
  path: "openai",
  version: "1",
})
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Post("/prompt")
  getStorySuggestedItems(@Body() data: PromptDto) {
    return this.openaiService.chatGptRequest(data.message);
  }
}
