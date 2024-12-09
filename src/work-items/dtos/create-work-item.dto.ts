import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateWorkItemDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(["NONE", "STORY", "TASK", "BUG"])
  type: string;

  @IsNumber()
  storyPoint: number;

  @IsEnum(["PENDING", "IN_PROGRESS", "DONE", "CLOSED"])
  status: string;

  @IsOptional()
  @IsString()
  assignedToUserId: string;

  @IsOptional()
  @IsString()
  parentWorkItemId: string;

  @IsString()
  projectId: string;

  @IsOptional()
  @IsString()
  sprintId: string;
}
