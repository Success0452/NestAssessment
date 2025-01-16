import {IsEnum, IsNotEmpty, IsOptional,} from "class-validator";
import {MediaFormat, MediaType} from "../../types/media.enums";
import {ApiProperty} from "@nestjs/swagger";

export class CreateMediaDto {
    @ApiProperty({
        description: "Url of the media file",
        example: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
        readOnly: true,
    })
    @IsOptional()
    url?: string;

    @IsEnum(MediaFormat)
    @IsOptional()
    format: MediaFormat = MediaFormat.JPG;

    @IsEnum(MediaType)
    type: MediaType = MediaType.IMAGE;

    @IsNotEmpty()
    propertyId: string;
}
