import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostgresConfig } from "./database/postgres.config";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "./resources/users/user.module";
import { IamModule } from "./resources/iam/iam.module";
import { MigrationService } from "./database/migration.service";
import { EmailService } from "./resources/iam/services/email.service";
import { MediaModule } from "./resources/media/media.module";
import { SeederService } from "./database/seeders/seeder.service";
import { PropertiesModule } from "./resources/properties/properties.module";
import { MessageModule } from "./resources/messages/message.module";
import { VerificationModule } from "./resources/verifications/verification.module";
import { SearchModule } from "./resources/searchs/search.module";
import { IntelligenceModule } from "./resources/intelligences/intelligence.module";
import { ListingModule } from "./resources/listings/listing.module";
import {SharedModule} from "./shared.modules";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(PostgresConfig),
    IamModule,
    UserModule,
    MediaModule,
   PropertiesModule,
    MessageModule,
    VerificationModule,
    SearchModule,
    IntelligenceModule,
    ListingModule,
      SharedModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    MigrationService,
    SeederService,
    EmailService,
    {
      provide: "EMAIL_CONFIG",
      useValue: {
        service: process.env.email_service,
        sendermail: process.env.email_user,
        password: process.env.email_pass,
      },
    },
  ],
})
export class AppModule {}
