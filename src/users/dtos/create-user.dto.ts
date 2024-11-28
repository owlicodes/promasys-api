import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  googleId: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  name: string;
}
