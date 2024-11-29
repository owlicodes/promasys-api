import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

import { OrganizationsService } from "../organizations.service";

@Injectable()
export class IsOrgMember implements CanActivate {
  constructor(private readonly organizationService: OrganizationsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { organizationId } = request.params;
    const { id } = request.user;

    const member = await this.organizationService.findOrgMember(
      id,
      organizationId
    );

    if (!member)
      throw new UnauthorizedException(
        "You are not allowed to perform this action on this organization."
      );

    return true;
  }
}
