import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import {IsBoolean, IsOptional, IsString} from "class-validator";

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional()
    @IsString()
    profilePicture?: string;

    @IsOptional()
    @IsString()
    googleId?: string;

    @IsOptional()
    @IsBoolean()
    isGoogleAccount?: boolean;
}
