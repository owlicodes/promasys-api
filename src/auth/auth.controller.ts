import { Body, Controller, Post } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { GoogleUserDto } from "./dtos/google-user.dto";

@Controller({
  path: "auth",
  version: "1",
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("google-sign-in")
  googleSignIn(@Body() body: GoogleUserDto) {
    return this.authService.googleSignIn(body);
  }
}
