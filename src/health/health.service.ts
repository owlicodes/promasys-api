import { Injectable } from "@nestjs/common";

@Injectable()
export class HealthService {
  checkHealth() {
    return "Application is healthy...";
  }
}
