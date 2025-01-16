import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import {CreateUserDto} from "../dto/inbound/create-user.dto";
import {UserResponseDto} from "../dto/outbound/user_response.dto";
import {PasswordService} from "../../iam/services/password.service";
import {UserRole} from "../types/user.enums";
import {UpdateUserDto} from "../dto/inbound/update-user.dto";
import {createHttpResponse} from "../../../core/response/response";
import {ChangePasswordDto} from "../dto/inbound/change-password.dto";
import {generateRandomNumber} from "../utils/user.utils";
import {EmailService} from "../../iam/services/email.service";
import {Otp} from "../entities/otp.entity";
import * as moment from "moment/moment";
import * as jwt from "jsonwebtoken";
import {LoginAccountDto} from "../../properties/dto/inbound/login-user.dto";
import {VerifyEmailDto} from "../dto/inbound/verify-email.dto";
import {SendOtpDto} from "../dto/inbound/send-otp.dto";

@Injectable()
export class UserService {
  constructor(
      private passwordService: PasswordService,
      private emailService: EmailService,
      @InjectRepository(User)
      private readonly userRepository: Repository<User>,
      @InjectRepository(Otp)
      private readonly otpRepository: Repository<Otp>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: [
        { email: createUserDto.email },
        { phone: createUserDto.phone },
      ],
    });

    if (existingUser) {
      UserResponseDto.mapToUserWithEmailAlreadyExists();
    }

    const hashedPassword = await this.passwordService.hashPassword(createUserDto.password);
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(user);

    const otpNumber = generateRandomNumber(4);
    const newOtp = this.otpRepository.create({
      code: otpNumber,
      user: savedUser,
    });
    await this.otpRepository.save(newOtp);

    await this.emailService.sendWelcomeEmail(createUserDto.email, user.firstName, otpNumber);

    const { ...response } = savedUser;
    return createHttpResponse(201, 'User created successfully.', response);
  }

  async sendOtp(sendOtpDto: SendOtpDto) {
    const { email } = sendOtpDto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      return UserResponseDto.mapToUserNotFound();
    }

    await this.otpRepository.delete({ user: { id: user.id } });

    const otpNumber = generateRandomNumber(6);
    const newOtp = this.otpRepository.create({
      code: otpNumber,
      user: user,
    });
    await this.otpRepository.save(newOtp);
    await this.emailService.sendOtpEmail(email, otpNumber);

    return createHttpResponse(200, "OTP sent successfully");
  }

  async verifyAccount(verifyEmailDto: VerifyEmailDto) {
    const { email, code } = verifyEmailDto;

    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      return UserResponseDto.mapToUserNotFound();
    } else if (user.isEmailVerified) {
      return UserResponseDto.mapToUserAlreadyVerified();
    }

    const otp = await this.otpRepository.findOne({
      where: { user: { id: user.id } },
      order: {
        createdAt: "DESC",
      },
    });

    if (!otp) {
      return UserResponseDto.mapToOtpNotFound();
    }
    if (otp.code !== code) {
      return UserResponseDto.mapToOtpNumberMismatch();
    }

    if (moment().isAfter(otp.expiresOn)) {
      return UserResponseDto.mapToOtpExpired();
    }

    await this.userRepository.update(
        { id: user.id },
        { isEmailVerified: true },
    );
    await this.emailService.sendOtpEmail(email, code);
    return createHttpResponse(200, 'User Account Verified Successfully')
  }

  async findAll(
      page: number = 1,
      limit: number = 10,
      role?: UserRole,
  ) {
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    if (role) {
      queryBuilder.where('user.role = :role', { role });
    }

    const [users, total] = await queryBuilder
        .skip((page - 1) * limit)
        .take(limit)
        .getManyAndCount();

    const sanitizedUsers = users.map(user => {
      const { ...rest } = user;
      return rest;
    });

    const data = {
      data: sanitizedUsers,
      total,
      page,
      limit,
    };

    return createHttpResponse(200, 'User fetched successfully.', data);
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      UserResponseDto.mapToUserNotFound();
    }

    const { ...response } = user;
    return createHttpResponse(200, 'User found successfully.', response);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      UserResponseDto.mapToUserNotFound();
    }

    if (updateUserDto.password) {
      updateUserDto.password = await this.passwordService.hashPassword(updateUserDto.password);
    }

    await this.userRepository.save({
      ...user,
      ...updateUserDto,
    });
    return createHttpResponse(200, 'update success');
  }

  async findByGoogleId(googleId: string): Promise<User> {
    return this.userRepository.findOne({ where: { googleId } });
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async linkGoogleAccount(userId: string, googleId: string): Promise<UserResponseDto> {
    const user = await this.findOne(userId);
    if (!user) {
      UserResponseDto.mapToUserNotFound();
    }

    const updatedUser = await this.userRepository.save({
      ...user,
      googleId,
      isGoogleAccount: true,
    });

    const { ...response } = updatedUser;
    return response;
  }

  async changePassword(userId: string, changePasswordDto: ChangePasswordDto) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      UserResponseDto.mapToUserNotFound();
    }

    const isPasswordValid = await this.passwordService.verifyHash(
        changePasswordDto.currentPassword,
        user.password,
    );

    if (!isPasswordValid) {
      UserResponseDto.mapToCurrentPasswordIsIncorrect();
    }

    user.password = await this.passwordService.hashPassword(changePasswordDto.newPassword);
    await this.userRepository.save(user);
    return createHttpResponse(200, 'Password changed successfully.');
  }

  async login(loginAccountDto: LoginAccountDto) {
    const { email, password } = loginAccountDto;
    const user = await this.userRepository
        .createQueryBuilder("user")
        .where("user.email = :email", { email })
        .addSelect("user.password")
        .getOne();

    if (!user) {
      return UserResponseDto.mapToUserNotFound();
    }
    if (user.isEmailVerified) {
      return UserResponseDto.mapToUserNotVerified();
    }
    if (user.isSuspended) {
      return UserResponseDto.mapToUserAccountDisabled();
    }

    const match = await this.passwordService.verifyHash(
        password,
        user.password,
    );

    if (!match) {
      return UserResponseDto.mapToInvalidCredentials();
    }

    const tokenDetails = {
      id: user.id,
      role: user.role,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    const token = jwt.sign(tokenDetails, process.env.jwt_secret);

    const data = {
      token,
      ...user
    }

    return createHttpResponse(200, 'User logged in successfully.', data);
  }

}
