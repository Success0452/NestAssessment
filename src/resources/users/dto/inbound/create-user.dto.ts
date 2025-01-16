import {IsEmail, IsEnum, IsOptional, IsPhoneNumber, IsString, MinLength} from "class-validator";
import {UserRole} from "../../types/user.enums";

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber('NG')
  phone: string;

  @MinLength(8)
  password: string;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}
