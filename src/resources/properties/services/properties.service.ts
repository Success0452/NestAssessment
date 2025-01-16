import {BadRequestException, Injectable} from '@nestjs/common';
import { InjectRepository} from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {CreatePropertyDto} from "../dto/inbound/create-property.dto";
import {UserRole} from "../../users/types/user.enums";
import { createHttpResponse } from "../../../core/response/response";
import {Property} from "../entities/property.entity";
import {User} from "../../users/entities/user.entity";
import {PropertyResponseDto} from "../dto/outbound/propertie_response.dto";
import {UpdatePropertyDto} from "../dto/inbound/update-property.dto";
import {PropertyStatus} from "../types/propertie.enums";
import {UserPropertyInteraction} from "../entities/user-property-interaction.entity";
import {checkIfUserExists} from "../../users/utils/user.utils";
import {MediaService} from "../../media/services/media.service";


@Injectable()
export class PropertiesService {
  constructor(
      @InjectRepository(Property)
      private readonly propertyRepository: Repository<Property>,
      @InjectRepository(User)
      private readonly userRepository: Repository<User>,
      @InjectRepository(UserPropertyInteraction)
      private readonly interactionRepository: Repository<UserPropertyInteraction>,
      private readonly mediaService: MediaService
  ) {}

  async createProperty(createPropertyDto: CreatePropertyDto, currentUser: User, file: Express.Multer.File) {

    checkIfUserExists(currentUser);

    const allowedRoles = [UserRole.DEPARTING_TENANT, UserRole.LANDLORD];
    if (!allowedRoles.includes(currentUser.role)) {
      return PropertyResponseDto.mapToPropertyUnableToCreateProperty();
    }
    const {availability, date_listed, media, ...otherFields } = createPropertyDto;

    const propertyData = {
      ...otherFields,
      availability: {
        ...availability,
        moveOutDate: new Date(availability.moveOutDate),
      },
      date_listed: new Date(date_listed),
      owner: currentUser,
    }

    const property = this.propertyRepository.create(propertyData);

    const savedProperty = await this.propertyRepository.save(property);

    if(!file){
      throw new BadRequestException('File not found');
    }
      if(media && media.length > 0){
        const mediaItem = media[0]
        await this.mediaService.uploadMedia(
            {...mediaItem, propertyId: savedProperty.id},
            currentUser,
            file
        )
      }

    const fullProperty = await this.propertyRepository.findOne({
      where: {id: savedProperty.id},
      relations: ['media'],
    })
    return createHttpResponse(201, 'Property created successfully.', fullProperty);
  }

  async updateProperty(propertyId: string, updatePropertyDto: UpdatePropertyDto, currentUser: User) {

    checkIfUserExists(currentUser)

    const allowedRoles = [UserRole.LANDLORD, UserRole.DEPARTING_TENANT];
    if (!allowedRoles.includes(currentUser.role)) {
      return PropertyResponseDto.mapToPropertyUnableToUpdateProperty();
    }

    const property = await this.propertyRepository.findOne({
      where: { id: propertyId },
      relations: ['owner', 'media'],
    });
    if (!property) {
      return PropertyResponseDto.mapToPropertyNotFound();
    }

    if (property.owner.id !== currentUser.id) {
      return PropertyResponseDto.mapToPropertyUnableToUpdateProperty();
    }

    const updatedProperty = await this.propertyRepository.save({
      ...property,
      ...updatePropertyDto,
    });

    return createHttpResponse(200, 'Property updated successfully.', updatedProperty);
  }

  async deleteProperty(propertyId: string, currentUser: User) {
    checkIfUserExists(currentUser)

    const property = await this.propertyRepository.findOneBy({id: propertyId});
    if (!property) {
      PropertyResponseDto.mapToPropertyNotFound()
    }

    const allowedRoles = [UserRole.LANDLORD];
    if (!allowedRoles.includes(currentUser.role)) {
      return PropertyResponseDto.mapToPropertyUnableToDeleteProperty();
    }

    await this.propertyRepository.remove(property);

    return PropertyResponseDto.mapToPropertyDeleted();
  }

  async findProperty(propertyId: string, currentUser: User) {
    checkIfUserExists(currentUser)

    const property = await this.propertyRepository.findOne({
      where: { id: propertyId },
      relations: ['media'],
    });
    if (!property) {
      PropertyResponseDto.mapToPropertyNotFound()
    }

    return createHttpResponse(201, 'Property retrieved successfully.', property);
  }

  async findAllProperties(currentUser: User) {
    checkIfUserExists(currentUser)

    if(![UserRole.ADMIN, UserRole.HOUSE_SEEKER, UserRole.LANDLORD].includes(currentUser.role)){
      PropertyResponseDto.mapToUnauthorizedAccess()
    }

    const properties = await this.propertyRepository.find({
      relations: ['media']
    })

    return createHttpResponse(200, 'Property retrieved successfully.', properties);
  }

  async findPropertiesByStatus(currentUser: User, status: PropertyStatus) {
    checkIfUserExists(currentUser)

    const properties = await this.propertyRepository.find({
      where: {status},
    });
    if (properties.length === 0) {
      PropertyResponseDto.mapToPropertyNotFound()
    }
    return createHttpResponse(200, `Properties with status ${status} retrieved successfully.`, properties);
  }

  async recommendProperties(currentUser: User, targetPropertyId: string) {
    checkIfUserExists(currentUser)

    const targetProperty = await this.propertyRepository.findOne({ where: { id: targetPropertyId } });
    if (!targetProperty) {
      return PropertyResponseDto.mapToPropertyNotFound();
    }

    const allProperties = await this.propertyRepository.find();

    // Prepare a list of property similarities
    const propertySimilarities = allProperties.map(property => {
      if (property.id === targetPropertyId) return null; // Skip the target property itself
      return {
        property,
        similarityCriteria: this.buildPropertySimilarityCriteria(property, targetProperty)
      };
    }).filter(similarity => similarity !== null); // Remove the null entries

    const sortedSimilarities = propertySimilarities.sort((a, b) => {
      // Sort by rent difference first
      const rentDiffA = a.similarityCriteria.rentDifference;
      const rentDiffB = b.similarityCriteria.rentDifference;

      if (rentDiffA !== rentDiffB) {
        return rentDiffA - rentDiffB; // Ascending order by rent difference
      }

      // If rent differences are equal, sort by bedroom difference
      const bedroomDiffA = a.similarityCriteria.bedroomsDifference;
      const bedroomDiffB = b.similarityCriteria.bedroomsDifference;

      if (bedroomDiffA !== bedroomDiffB) {
        return bedroomDiffA - bedroomDiffB;
      }

      const bathroomDiffA = a.similarityCriteria.bathroomsDifference;
      const bathroomDiffB = b.similarityCriteria.bathroomsDifference;

      return bathroomDiffA - bathroomDiffB;
    });


    const topRecommendations = sortedSimilarities.slice(0, 10).map(similarity => similarity.property);

    return createHttpResponse(200, 'Recommended properties based on your preferences.', topRecommendations);
  }

  private buildPropertySimilarityCriteria(property: Property, targetProperty: Property) {
    const similarityCriteria = {
      rentDifference: 0,
      securityDepositDifference: 0,
      otherFeesDifference: 0,
      bedroomsDifference: 0,
      bathroomsDifference: 0,
      squareFootageDifference: 0,
      featureMatchCount: 0
    };

    if (property.pricing && targetProperty.pricing) {
      similarityCriteria.rentDifference = Math.abs(property.pricing.rent - targetProperty.pricing.rent);
      similarityCriteria.securityDepositDifference = Math.abs(property.pricing.securityDeposit - targetProperty.pricing.securityDeposit);
      similarityCriteria.otherFeesDifference = Object.keys(property.pricing.otherFees).reduce((acc, key) => {
        return acc + Math.abs((property.pricing.otherFees[key] || 0) - (targetProperty.pricing.otherFees[key] || 0));
      }, 0);
    }

    if (property.details && targetProperty.details) {
      similarityCriteria.bedroomsDifference = Math.abs(property.details.bedrooms - targetProperty.details.bedrooms);
      similarityCriteria.bathroomsDifference = Math.abs(property.details.bathrooms - targetProperty.details.bathrooms);
      similarityCriteria.squareFootageDifference = Math.abs(property.details.squareFootage - targetProperty.details.squareFootage);

      similarityCriteria.featureMatchCount = property.details.features.filter(feature =>
          targetProperty.details.features.includes(feature)
      ).length;
    }

    return similarityCriteria;
  }

}
