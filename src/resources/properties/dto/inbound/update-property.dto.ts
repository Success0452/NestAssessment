import { PartialType } from '@nestjs/swagger';
import {AvailabilityDto, CreatePropertyDto} from './create-property.dto';
import {Type} from "class-transformer";
import {IsArray, IsNumber, IsOptional, IsString, ValidateNested} from "class-validator";
import {CreateMediaDto} from "../../../media/dto/inbound/create-media.dto";

export class UpdatePropertyDto extends PartialType(CreatePropertyDto) {
    @IsOptional()
    @IsString()
    house_type?: string;

    @IsOptional()
    @IsString()
    house_details?: string;

    @IsOptional()
    @IsNumber()
    price?: number;

    @IsOptional()
    @ValidateNested()
    @Type(() => AvailabilityDto)
    availability?: {
        moveOutDate: Date;
        minimumLease: number;
        maximumLease: number;
    };

    @IsOptional()
    @IsArray()
    other_features?: string[];

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    house_images?: string[];

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    videos?: string[];

    @IsOptional()
    @IsString()
    virtualTourUrl?: string;


    @ValidateNested()
    @Type(() => CreateMediaDto)
    @IsOptional()
    media?: CreateMediaDto[];
}
