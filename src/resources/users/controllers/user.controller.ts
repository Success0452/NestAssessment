import {Controller, Post, Body, Param, Get, UseGuards, Query, Patch} from "@nestjs/common";
import { UserService } from "../services/user.service";
import { CreateUserDto } from "../dto/inbound/create-user.dto";
import {RolesGuard} from "../middleware/role-guard.middleware";
import {UserRole} from "../types/user.enums";
import {User} from "../entities/user.entity";
import {UpdateUserDto} from "../dto/inbound/update-user.dto";
import {ChangePasswordDto} from "../dto/inbound/change-password.dto";
import {AuthGuard} from "../../iam/middlewares/auth.middleware";
import {VerifyEmailDto} from "../dto/inbound/verify-email.dto";
import {LoginAccountDto} from "../../properties/dto/inbound/login-user.dto";
import {SendOtpDto} from "../dto/inbound/send-otp.dto";
import {GetUser, Roles} from "../../../utils/decorators";
import {ApiBody, ApiParam, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import {
  ChangePasswordResponseSchema,
  ChangePasswordSchema,
  CreateUserResponseSchema,
  CreateUserSchema,
  FindAllUsersQuerySchema,
  FindOneUserResponseSchema,
  LoginAccountSchema,
  LoginResponseSchema,
  SendOtpResponseSchema,
  SendOtpSchema,
  UpdateUserResponseSchema,
  UpdateUserSchema,
  UserListResponseSchema,
  VerifyEmailResponseSchema,
  VerifyEmailSchema
} from "../schemas/users-schema";

@Controller("users")
@ApiTags("User")
@UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBody({ schema: CreateUserSchema })
  @ApiResponse({ schema: CreateUserResponseSchema })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Roles(UserRole.ADMIN)
  @ApiResponse({ schema: UserListResponseSchema })
  @ApiQuery({ schema: FindAllUsersQuerySchema })
  async findAll(
      @Query('page') page: number = 1,
      @Query('limit') limit: number = 10,
      @Query('role') role?: UserRole,
  ) {
    return this.userService.findAll(page, limit, role);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiParam({ name: 'id' })
  @ApiResponse({ schema: FindOneUserResponseSchema })
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch()
  @UseGuards(AuthGuard)
  @ApiBody({ schema: UpdateUserSchema })
  @ApiResponse({ schema: UpdateUserResponseSchema })
  async update(
      @Body() updateUserDto: UpdateUserDto,
      @GetUser() currentUser: User,
  ) {
    return this.userService.update(currentUser.id, updateUserDto);
  }

  @Patch('verify-account')
  @ApiResponse({ schema: VerifyEmailResponseSchema })
  @ApiBody({ schema: VerifyEmailSchema })
  async verifyUserAccount(
      @Body() verifyEmailDto: VerifyEmailDto,
  ) {
    return this.userService.verifyAccount(verifyEmailDto);
  }

  @Post('change-password')
  @UseGuards(AuthGuard)
  @ApiResponse({ schema: ChangePasswordResponseSchema })
  @ApiBody({ schema: ChangePasswordSchema })
  async changePassword(
      @GetUser() currentUser: User,
      @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.userService.changePassword(currentUser.id, changePasswordDto);
  }

  @Post('resend-otp')
  @ApiResponse({ schema: SendOtpResponseSchema })
  @ApiBody({ schema: SendOtpSchema })
  async resendOtp(
      @Body() sendOtpDto: SendOtpDto,
  ) {
    return this.userService.sendOtp(sendOtpDto);
  }

  @Post('login')
  @ApiResponse({ schema: LoginResponseSchema })
  @ApiBody({ schema: LoginAccountSchema })
  async login(
      @Body() loginAccountDto: LoginAccountDto,
  ) {
    return this.userService.login(loginAccountDto);
  }
}
