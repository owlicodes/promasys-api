import { Type } from "class-transformer";
import { IsDate, IsEnum, IsISO8601, IsString } from "class-validator";

export class CreateSprintDto {
  @IsString()
  name: string;

  @IsISO8601()
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsISO8601()
  @IsDate()
  @Type(() => Date)
  endDate: Date;

  @IsEnum(["PLANNED", "STARTED", "CLOSED"])
  status: string;

  @IsString()
  projectId: string;
}
