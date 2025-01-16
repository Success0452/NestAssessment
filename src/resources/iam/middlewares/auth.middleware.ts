import {CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException,} from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import {createHttpResponse} from "src/core/response/response";

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = request.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new UnauthorizedException(
        createHttpResponse(401, "Unauthorized: JWT token is missing"),
      );
    }

    const decodedToken = await this.verifyToken(token);
    if (!decodedToken) {
      throw new UnauthorizedException(
        createHttpResponse(401, "Unauthorized: Invalid or expired token"),
      );
    }

    request.user = decodedToken;
    return true;
  }

  private async verifyToken(token: string) {
    const secret = process.env.jwt_secret;
    try {
      return jwt.verify(token, secret);
    } catch (error) {
      this.logger.error("JWT verification failed", error?.stack);

      return null;
    }
  }
}
