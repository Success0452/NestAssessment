import {
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    UnauthorizedException,
} from "@nestjs/common";
import { createHttpResponse } from "src/core/response/response";
import { Property } from "../../entities/property.entity";

export class PropertyResponseDto {
    static mapToPropertyNotFound() {
        throw new NotFoundException(
            createHttpResponse(404, "Property not found."),
        );
    }

    static mapToPropertyCreated(property: Property) {
        return createHttpResponse(201, "Property created successfully", property);
    }

    static mapToGetAllProperties(properties: Property[]) {
        return createHttpResponse(200, "Properties fetched successfully", properties);
    }

    static mapToPropertyAlreadyExists() {
        throw new ConflictException(
            createHttpResponse(409, "Property with these details already exists"),
        );
    }

    static mapToInvalidPropertyData() {
        throw new BadRequestException(
            createHttpResponse(400, "Invalid property data"),
        );
    }

    static mapToUnauthorizedAccess() {
        throw new UnauthorizedException(
            createHttpResponse(401, "Unauthorized access to this property"),
        );
    }

    static mapToForbiddenPropertyAction() {
        throw new ForbiddenException(
            createHttpResponse(403, "You do not have permission for this action"),
        );
    }

    static mapToPropertyDeleted() {
        return createHttpResponse(200, "Property deleted successfully");
    }

    static mapToPropertyUnableToCreateProperty() {
        throw new UnauthorizedException(
            createHttpResponse(403, "Only landlords or departing tenants can create properties"),
        );
    }

    static mapToPropertyUnableToUpdateProperty() {
        throw new UnauthorizedException(
            createHttpResponse(403, "Only the creating user can update properties"),
        );
    }

    static mapToPropertyUnableToDeleteProperty() {
        throw new UnauthorizedException(
            createHttpResponse(403, "Only landlords can delete property"),
        );
    }

    static mapToNoInteractionsFound() {
        throw new NotFoundException(
            createHttpResponse(404, "Not Found"),
        )
    }
}
