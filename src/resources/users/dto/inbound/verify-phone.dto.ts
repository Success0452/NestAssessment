import {IsPhoneNumber, IsString} from "class-validator";

export class VerifyPhoneDto {
    @IsString()
    code: string;

    @IsPhoneNumber('NG')
    phone: string;
}
