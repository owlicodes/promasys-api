import { Injectable, ServiceUnavailableException } from "@nestjs/common";

import OpenAIApi from "openai";
import { ChatCompletion } from "openai/resources";

import { EnvConfigService } from "../env-config/env-config.service";

@Injectable()
export class OpenaiService {
  private openai: OpenAIApi;

  constructor(private readonly envConfigService: EnvConfigService) {
    this.openai = new OpenAIApi({
      apiKey: envConfigService.getOpenAiApiKey(),
    });
  }

  async chatGptRequest(prompt: string): Promise<string> {
    try {
      if (!this.envConfigService.getEnableAi()) {
        return "We apologize for the inconvenience but we have temporarily disabled AI in our product. Hoping for your understanding.";
      } else {
        const completion: ChatCompletion =
          await this.openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "developer",
                content: `I am using agile methodologies in building my web application and I have a story which is (${prompt}), can you suggest some work items for this story?`,
              },
            ],
          });

        const [content] = completion.choices.map(
          (choice) => choice.message.content
        );

        return content;
      }
    } catch (e) {
      console.error(e);
      throw new ServiceUnavailableException("Failed request to ChatGPT");
    }
  }
}
