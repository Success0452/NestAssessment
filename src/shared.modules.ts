import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property} from "./resources/properties/entities/property.entity";
import {Media} from "./resources/media/entities/media.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Property, Media])],
    exports: [TypeOrmModule],
})
export class SharedModule {}