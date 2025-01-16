import {
    BadRequestException,
    NotFoundException,
    ConflictException,
    ForbiddenException,
    UnauthorizedException,
} from '@nestjs/common';
import { createHttpResponse} from "../../../../core/response/response";
import { Media } from "../../entities/media.entity";
import {Property} from "../../../properties/entities/property.entity";

export class MediaResponseDto {
    static mapToMediaNotFound() {
        throw new NotFoundException(
            createHttpResponse(404, 'Media not found'),
        )
    }
    static mapToMediaCreated(media: Media) {
        return createHttpResponse(201, "Media uploaded successfully", media);
    }

    static mapToUnauthorizedAccess() {
        throw new UnauthorizedException(
            createHttpResponse(401, "Unauthorized access to this property"),
        );
    }

    static mapToMediaDeleted() {
        return createHttpResponse(200, "Media deleted successfully");
    }

    static mapToUnableToUpdateMedia() {
        throw new UnauthorizedException(
            createHttpResponse(403, "Only the creating user can update media"),
        );
    }

    static mapToMediaFetchedSuccessfully(){
        return createHttpResponse(200, "Media fetched successfully");
    }
}