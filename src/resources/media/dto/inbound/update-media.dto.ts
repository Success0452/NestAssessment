import { PartialType } from '@nestjs/swagger';
import { CreateMediaDto } from './create-media.dto';
import {IsOptional, IsString} from "class-validator";

export class UpdateMediaDto extends PartialType(CreateMediaDto) {
    @IsString()
    @IsOptional()
    id?: string;
}
