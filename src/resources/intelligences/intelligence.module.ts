import { Module } from '@nestjs/common';
import {IntelligenceController} from "./controllers/intelligence.controller";
import {IntelligenceService} from "./services/intelligence.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Intelligence} from "./entities/intelligence.entity";
import {ChatSession} from "./entities/chat-session.entity";
import {Property} from "../properties/entities/property.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Intelligence, ChatSession, Property])],
  controllers: [IntelligenceController],
  providers: [IntelligenceService],
})
export class IntelligenceModule {}
