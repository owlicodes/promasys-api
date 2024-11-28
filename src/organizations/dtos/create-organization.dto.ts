import { IsString } from "class-validator";

export class CreateOrganizationDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  userId: string;
}
