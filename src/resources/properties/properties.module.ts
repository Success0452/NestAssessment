import { Module } from '@nestjs/common';
import {PropertiesController} from "./controllers/properties.controller";
import {PropertiesService} from "./services/properties.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PropertyLocation} from "./entities/property-location.entity";
import {UserPropertyInteraction} from "./entities/user-property-interaction.entity";
import {User} from "../users/entities/user.entity";
import {SharedModule} from "../../shared.modules";
import {MediaModule} from "../media/media.module";
import {Property} from "./entities/property.entity";


@Module({
  imports: [TypeOrmModule.forFeature([Property, PropertyLocation, UserPropertyInteraction, User,]),
    SharedModule, MediaModule
  ],
  controllers: [PropertiesController],
  providers: [PropertiesService],
})
export class PropertiesModule {}
