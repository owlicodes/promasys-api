import { IsString } from "class-validator";

export class PromptDto {
  @IsString()
  message: string;
}
