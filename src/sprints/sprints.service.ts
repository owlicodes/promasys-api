import { Injectable } from "@nestjs/common";

import { WORK_ITEM_TYPE } from "@prisma/client";

import { CreateSprintDto } from "./dtos/create-sprint.dto";
import { UpdateSprintDto } from "./dtos/update-sprint.dto";
import { SprintsRepository } from "./sprints.repository";

@Injectable()
export class SprintsService {
  constructor(private readonly sprintsRepository: SprintsRepository) {}

  createSprint(data: CreateSprintDto) {
    return this.sprintsRepository.createSprint(data);
  }

  findSprintsByProject(projectId: string) {
    return this.sprintsRepository.findSprintsByProject(projectId);
  }

  findSingleSprintForProject(projectId: string) {
    return this.sprintsRepository.findSingleSprintForProject(projectId);
  }

  findSprintById(sprintId: string, type: WORK_ITEM_TYPE | "ALL") {
    return this.sprintsRepository.findSprintById(sprintId, type);
  }

  updateSprint(sprintId: string, data: UpdateSprintDto) {
    return this.sprintsRepository.updateSprint(sprintId, data);
  }

  deleteSprint(sprintId: string) {
    return this.sprintsRepository.deleteSprint(sprintId);
  }
}
