import { OAuth2Client } from 'google-auth-library';
import {Injectable} from "@nestjs/common";
import {GoogleUserDto} from "../dto/inbound/google-auth.dto";
import {UserResponseDto} from "../dto/outbound/user_response.dto";
import {UserRole} from "../types/user.enums";
import {Repository} from "typeorm";
import {User} from "../entities/user.entity";
import * as jwt from "jsonwebtoken";
import {createHttpResponse} from "../../../core/response/response";
import * as process from "node:process";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class GoogleAuthService {
    private readonly oAuth2Client: OAuth2Client;
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
        this.oAuth2Client = new OAuth2Client(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            'postmessage',
        );
    }

    async validateGoogleToken(token: string): Promise<GoogleUserDto> {
        try {
            const ticket = await this.oAuth2Client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID,
            });

            const payload = ticket.getPayload();
            return {
                googleId: payload.sub,
                email: payload.email,
                firstName: payload.given_name,
                lastName: payload.family_name,
                profilePicture: payload.picture,
            };
        } catch (error) {
            console.log(error)
            UserResponseDto.mapToInvalidGoogleToken();
        }
    }

    async signIn(googleUser: GoogleUserDto) {
        let user = await this.userRepository.findOne({ where: { googleId: googleUser.googleId } });

        if (!user) {
            user = await this.userRepository.findOne({ where: { email: googleUser.email } });

            if (user) {
                user = await this.userRepository.save({
                    ...user,
                    googleId: googleUser.googleId,
                    isGoogleAccount: true,
                });
            } else {
                user = this.userRepository.create({
                    email: googleUser.email,
                    firstName: googleUser.firstName,
                    lastName: googleUser.lastName,
                    googleId: googleUser.googleId,
                    isGoogleAccount: true,
                    role: UserRole.HOUSE_SEEKER,
                    isEmailVerified: true,
                });
            }
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
