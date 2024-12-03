import { IsString } from "class-validator";

export class CreateProjectDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  organizationId: string;

  @IsString()
  ownerId: string;
}
