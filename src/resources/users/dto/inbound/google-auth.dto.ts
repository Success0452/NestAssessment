import { IsString, IsEmail, IsOptional } from 'class-validator';

export class GoogleAuthDto {
    @IsString()
    token: string;
}

export class GoogleUserDto {
    @IsString()
    googleId: string;

    @IsEmail()
    email: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsOptional()
    @IsString()
    profilePicture?: string;
}
