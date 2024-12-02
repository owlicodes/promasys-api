import { IsString } from "class-validator";

export class UpdateProjectDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  organizationId: string;

  @IsString()
  ownerId: string;
}
