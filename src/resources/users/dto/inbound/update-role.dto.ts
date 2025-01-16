import { ApiProperty } from "@nestjs/swagger";
import {IsEnum} from "class-validator";
import {UserRole} from "../../types/user.enums";

export class UpdateRoleDto {
    @ApiProperty({
        enum: UserRole,
        description: 'New role for the user'
    })
    @IsEnum(UserRole, {
        message: 'Invalid role provided'
    })
    role: UserRole;
}