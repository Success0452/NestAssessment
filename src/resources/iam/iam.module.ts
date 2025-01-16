import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/entities/user.entity";
import { PasswordService } from "./services/password.service";
import { AuthController } from "./controllers/auth.controller";
import { EmailService } from "./services/email.service";
import {Otp} from "../users/entities/otp.entity";
import {GoogleAuthService} from "../users/services/google-auth.service";

@Module({
  imports: [TypeOrmModule.forFeature([User, Otp])],
  controllers: [AuthController],
  providers: [
    PasswordService,
    GoogleAuthService,
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
export class IamModule {}
