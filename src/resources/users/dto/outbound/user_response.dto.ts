import {
  BadRequestException,
  ConflictException, ForbiddenException,
  NotFoundException, UnauthorizedException,
} from "@nestjs/common";
import { createHttpResponse } from "src/core/response/response";
import { User } from "../../entities/user.entity";;

export class UserResponseDto {
  static mapToUserNotFound() {
    throw new NotFoundException(
      createHttpResponse(404, "No user(s) is tied to this account."),
    );
  }
  static mapToUserCreated(user: User) {
    return createHttpResponse(201, "User created successfully", user);
  }

  static mapToGetAllUsers(users: User[]) {
    return createHttpResponse(200, "Users fetched successfully", users);
  }

  static mapToUserWithEmailAlreadyExists() {
    throw new NotFoundException(
       createHttpResponse(200, "User with this email already exists"),
    );
  }

  static mapToCurrentPasswordIsIncorrect() {
    throw new NotFoundException(
        createHttpResponse(200, "Current password is incorrect"),
    );
  }

  static mapToUserAlreadyVerified() {
    throw new ConflictException(
        createHttpResponse(409, "User is already verified"),
    );
  }

  static mapToOtpExpired() {
    throw new BadRequestException(createHttpResponse(400, "OTP has expired."));
  }

  static mapToOtpNotFound() {
    throw new NotFoundException(createHttpResponse(404, "OTP not found"));
  }

  static mapToOtpNumberMismatch() {
    throw new BadRequestException(
        createHttpResponse(400, "OTP number mismatch"),
    );
  }

  static mapToUserAccountDisabled() {
    throw new BadRequestException(
        createHttpResponse(400, "User Account Disabled, Please Contact admin"),
    );
  }

  static mapToInvalidCredentials() {
    throw new BadRequestException(
        createHttpResponse(400, "Invalid Credentials"),
    );
  }

  static mapToYouMustBeAnAdmin() {
    throw new ForbiddenException(
        createHttpResponse(404, "User Must be an Admin to use this endpoint"),
    );
  }

  static mapToUserNotVerified() {
    throw new ConflictException(
        createHttpResponse(409, "User account yet to be verified"),
    );
  }

  static mapToInvalidGoogleToken() {
    throw new UnauthorizedException(
        createHttpResponse(409, "Invalid Google token"),
    );
  }

}
