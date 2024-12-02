import { Injectable } from "@nestjs/common";

import { CreateSprintDto } from "./dtos/create-sprint.dto";
import { SprintsRepository } from "./sprints.repository";

@Injectable()
export class SprintsService {
  constructor(private readonly sprintsRepository: SprintsRepository) {}

  createSprint(data: CreateSprintDto) {
    return this.sprintsRepository.createSprint(data);
  }
}
