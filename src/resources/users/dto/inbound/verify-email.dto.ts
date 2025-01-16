import {IsNumber, IsPhoneNumber} from "class-validator";

export class VerifyEmailDto {
    @IsNumber()
    code: number;

    @IsPhoneNumber('NG')
    email: string;
}
