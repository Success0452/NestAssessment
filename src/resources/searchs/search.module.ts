import { Module } from '@nestjs/common';
import {SearchController} from "./controllers/search.controller";
import {SearchService} from "./services/search.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {SavedSearch} from "./entities/search.entity";

@Module({
  imports: [TypeOrmModule.forFeature([SavedSearch])],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
