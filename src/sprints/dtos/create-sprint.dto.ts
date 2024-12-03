import { Type } from "class-transformer";
import { IsDate, IsEnum, IsString } from "class-validator";

export class CreateSprintDto {
  @IsString()
  name: string;

  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  endDate: Date;

  @IsEnum(["PLANNED", "STARTED", "CLOSED"])
  status: string;

  @IsString()
  projectId: string;
}
