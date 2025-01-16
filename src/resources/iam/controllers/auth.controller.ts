import {
  Body,
  Controller,
  Post,
} from "@nestjs/common";
import {ApiBody, ApiResponse, ApiTags} from "@nestjs/swagger";
import {GoogleAuthService} from "../../users/services/google-auth.service";
import {GoogleAuthDto} from "../../users/dto/inbound/google-auth.dto";
import {
  GoogleSignInResponseSchema,
  GoogleUserSchema
} from "../../users/schemas/users-schema";

@Controller("auth")
@ApiTags("Authentication")
export class AuthController {
  constructor(
      private readonly googleAuthService: GoogleAuthService,
  ) {}

  @Post('google')
  @ApiBody({ schema: GoogleUserSchema })
  @ApiResponse({ schema: GoogleSignInResponseSchema })
  async googleAuth(@Body() googleAuthDto: GoogleAuthDto) {
    const googleUser = await this.googleAuthService.validateGoogleToken(googleAuthDto.token);
    return this.googleAuthService.signIn(googleUser);
  }
}
