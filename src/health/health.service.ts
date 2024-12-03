import { Injectable } from "@nestjs/common";

@Injectable()
export class HealthService {
  checkHealth() {
    return {
      status: "healthy...",
      version: "0.0.3",
    };
  }
}
