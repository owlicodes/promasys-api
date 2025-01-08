import { IsString } from "class-validator";

export class CreateOrganizationMemberDto {
  @IsString()
  organizationId: string;
}
