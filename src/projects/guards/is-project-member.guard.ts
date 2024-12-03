import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

import { ProjectsService } from "../projects.service";

@Injectable()
export class IsProjectMember implements CanActivate {
  constructor(private readonly projectService: ProjectsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { projectId } = request.params;
    const { id } = request.user;

    const member = await this.projectService.findUserInProject(projectId, id);

    if (!member)
      throw new UnauthorizedException(
        "You are not allowed to perform this action on this project."
      );

    return true;
  }
}
