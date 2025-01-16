import { Module } from "@nestjs/common";
import { MediaController } from "./controllers/media.controller";
import { MediaService } from "./services/media.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {SharedModule} from "../../shared.modules";
import {Media} from "./entities/media.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Media]), SharedModule],
  controllers: [MediaController],
  providers: [MediaService],
  exports: [MediaService],
})
export class MediaModule {}
