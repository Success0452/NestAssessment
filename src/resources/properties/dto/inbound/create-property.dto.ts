import { ArrayNotEmpty, IsArray, IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { Transform, Type } from "class-transformer";
import { PropertyStatus, PropertyType } from "../../types/propertie.enums";
import { OtherFeatures } from "../../utils/propertie.utils";
import { CreateMediaDto } from "../../../media/dto/inbound/create-media.dto";

export class CoordinatesDto {
    @IsNumber()
    @IsNotEmpty()
    lat: number;

    @IsNumber()
    @IsNotEmpty()
    lng: number;
}

export class DetailsDto {
    @IsNumber()
    @IsNotEmpty()
    bedrooms: number;

    @IsNumber()
    @IsNotEmpty()
    bathrooms: number;

    @IsArray()
    @ArrayNotEmpty()
    @IsEnum(OtherFeatures, { each: true })
    features: OtherFeatures[];

    @IsNumber()
    @IsNotEmpty()
    squareFootage: number;
}

export class PricingDto {
    @IsNumber()
    @IsNotEmpty()
    rent: number;

    @IsNumber()
    @IsNotEmpty()
    securityDeposit: number;

    @IsOptional()
    otherFees: Record<string, number>;
}

export class AvailabilityDto {
    @IsDate()
    @IsNotEmpty()
    @Transform(({ value }) => new Date(value))
    moveOutDate: Date;

    @IsNumber()
    @IsNotEmpty()
    minimumLease?: number;

    @IsNumber()
    @IsNotEmpty()
    maximumLease?: number;
}

export class CreatePropertyDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsEnum(PropertyType)
    @IsNotEmpty()
    type: PropertyType;

    @ValidateNested()
    @Type(() => CoordinatesDto)
    @IsOptional()
    coordinates?: CoordinatesDto;

    @ValidateNested()
    @Type(() => DetailsDto)
    @IsNotEmpty()
    details: DetailsDto;

    @ValidateNested()
    @Type(() => PricingDto)
    @IsNotEmpty()
    pricing: PricingDto;

    @ValidateNested()
    @Type(() => AvailabilityDto)
    @IsNotEmpty()
    availability: AvailabilityDto;

    @IsString()
    @IsOptional()
    virtualTourUrl?: string;

    @IsEnum(PropertyStatus)
    @IsOptional()
    status?: PropertyStatus;

    @IsNumber()
    @IsOptional()
    aiMatchScore?: number;

    @IsDate()
    @IsNotEmpty()
    @Transform(({ value }) => new Date(value))
    date_listed: Date;

    @ValidateNested({ each: true })
    @Type(() => CreateMediaDto)
    @IsArray()
    @ArrayNotEmpty()
    media: CreateMediaDto[];
}
