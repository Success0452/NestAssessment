import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import {PropertiesService} from "../services/properties.service";
import {CreatePropertyDto} from "../dto/inbound/create-property.dto";
import {UserRole} from "../../users/types/user.enums";
import {AuthGuard} from "../../iam/middlewares/auth.middleware";
import {ApiBearerAuth, ApiBody, ApiConsumes, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import {
  CreatePropertyListingSchema,
  CreatePropertyListResponseSchema, DeletePropertyResponseSchema,
  FindAllPropertiesResponseSchema, FindPropertiesByStatusResponseSchema,
  FindPropertyResponseSchema, RecommendPropertiesResponseSchema,
  UpdatePropertyListingResponseSchema,
  UpdatePropertyListingSchema,
} from "../schemas/properties-schema";
import {GetUser, Roles} from "../../../utils/decorators";
import {User} from "../../users/entities/user.entity";
import {UpdatePropertyDto} from "../dto/inbound/update-property.dto";
import {PropertyStatus} from "../types/propertie.enums";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('properties')
@ApiTags('Properties')
@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard)
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('media'))
  @ApiConsumes('multipart/form-data')
  @Roles(UserRole.DEPARTING_TENANT, UserRole.LANDLORD)
  @ApiBody({ schema: CreatePropertyListingSchema})
  @ApiResponse({ schema: CreatePropertyListResponseSchema })
  async create(
      @Body() createPropertyDto: CreatePropertyDto,
      @GetUser() currentUser: User,
      @UploadedFile() file: Express.Multer.File,
     ) {
    return this.propertiesService.createProperty(createPropertyDto, currentUser, file)
  }

  @Put(':propertyId')
  @Roles(UserRole.DEPARTING_TENANT, UserRole.LANDLORD)
  @ApiBody({ schema: UpdatePropertyListingSchema })
  @ApiResponse({ schema: UpdatePropertyListingResponseSchema })
  async updateProperty(
      @Param('propertyId') propertyId: string,
      @Body() updatePropertyDto: UpdatePropertyDto,
      @GetUser() currentUser: User,
  ) {
    return this.propertiesService.updateProperty(propertyId, updatePropertyDto, currentUser);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.HOUSE_SEEKER, UserRole.LANDLORD)
  @ApiResponse({ schema: FindAllPropertiesResponseSchema })
  async findAllProperties(@GetUser() currentUser: User) {
    return this.propertiesService.findAllProperties(currentUser)
  }

  @Get(':propertyId')
  @ApiResponse({ schema: FindPropertyResponseSchema })
  async findOne(
      @Param('propertyId') propertyId: string,
      @GetUser() currentUser: User,
  ) {
    return this.propertiesService.findProperty(propertyId, currentUser)
  }

  @Get('status/:status')
  @ApiResponse({ schema: FindPropertiesByStatusResponseSchema })
  async findStatus(
      @Param('status') status: PropertyStatus,
      @GetUser() currentUser: User,
  ) {
    return this.propertiesService.findPropertiesByStatus(currentUser, status)
  }

  @Delete(':propertyId')
  @ApiResponse({ schema: DeletePropertyResponseSchema })
  @Roles(UserRole.LANDLORD)
  async delete(
      @Param('propertyId') propertyId: string,
      @GetUser() currentUser: User,
  ) {
    return this.propertiesService.deleteProperty(propertyId, currentUser)
  }

  @Get('recommendations/:targetPropertyId')
  @ApiQuery({
    name: 'targetPropertyId',
    description: 'The ID of the property to get recommendations for',
    type: 'string',
  })
  @ApiResponse({schema: RecommendPropertiesResponseSchema})
  async recommendations(
      @Param('targetPropertyId') targetPropertyId: string,
      @GetUser() currentUser: User,
  ) {
    return this.propertiesService.recommendProperties(currentUser, targetPropertyId)
  }
}