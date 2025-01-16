import { IsEmail, IsOptional, IsString } from "class-validator";

export class SendOtpDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsEmail()
  @IsOptional()
  email?: string;
}
