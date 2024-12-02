import { Injectable } from "@nestjs/common";

import { SprintsRepository } from "./sprints.repository";

@Injectable()
export class SprintsService {
  constructor(private readonly sprintsRepository: SprintsRepository) {}
}
