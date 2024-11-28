import { Controller } from "@nestjs/common";

import { OrganizationsService } from "./organizations.service";

@Controller({
  path: "organizations",
  version: "1",
})
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}
}
