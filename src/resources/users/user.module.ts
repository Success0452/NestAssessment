import { Module } from "@nestjs/common";
import { UserController } from "./controllers/user.controller";
import { UserService } from "./services/user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import {PasswordService} from "../iam/services/password.service";
import {City} from "./entities/city.entity";
import {Country} from "./entities/country.entity";
import {Otp} from "./entities/otp.entity";
import {Property} from "../properties/entities/property.entity";
import {PropertyLocation} from "../properties/entities/property-location.entity";
import {EmailService} from "../iam/services/email.service";

@Module({
  imports: [TypeOrmModule.forFeature([User, City, Country, Otp, Property, PropertyLocation])],
  controllers: [UserController],
  providers: [
      UserService,
    PasswordService,
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
export class UserModule {}
