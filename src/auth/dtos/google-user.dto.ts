import { IsEmail, IsString } from "class-validator";

export class GoogleUserDto {
  @IsString()
  googleId: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  idToken: string;
}
