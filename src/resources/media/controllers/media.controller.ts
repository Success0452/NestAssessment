import {
    BadRequestException,
    Body,
    Controller, Delete,
    Get, Param,
    Post,
    Query,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from "@nestjs/common";
import {MediaService} from "../services/media.service";
import {Media} from "../entities/media.entity";
import {MediaType} from "../types/media.enums";
import {GetUser, Roles} from "../../../utils/decorators";
import {UserRole} from "../../users/types/user.enums";
import {ApiBearerAuth, ApiBody, ApiConsumes, ApiResponse, ApiTags} from "@nestjs/swagger";
import {
    CreateMediaResponseSchema,
    CreateMediaSchema,
    DeleteMediaResponseSchema,
    FindMediaResponseSchema
} from "../schemas/media-schema";
import {FileInterceptor} from "@nestjs/platform-express";
import {CreateMediaDto} from "../dto/inbound/create-media.dto";
import {User} from "../../users/entities/user.entity";
import {AuthGuard} from "../../iam/middlewares/auth.middleware";

@Controller("media")
@ApiTags('Media')
@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard)
export class MediaController {
    constructor(private readonly mediaService: MediaService) {}

    @Get()
    @Roles(UserRole.ADMIN)
    async getAll(
        @Query('type') type?: MediaType
    ): Promise<Media[]> {
        return this.mediaService.findAllMedia(type);
    }

    @Post("upload")
    @ApiConsumes('multipart/form-data')
    @ApiBody({schema: CreateMediaSchema})
    @ApiResponse({schema: CreateMediaResponseSchema})
    @UseInterceptors(FileInterceptor('file'))
    async upload(
        @UploadedFile() file: Express.Multer.File,
        @GetUser() currentUser: User,
        @Body() createMediaDto: CreateMediaDto,
        ){
        if(!file){
            throw new BadRequestException("No file uploaded");
        }
        return this.mediaService.uploadMedia(createMediaDto, currentUser, file)
    }
    @Get(":mediaId")
    @ApiResponse({schema: FindMediaResponseSchema})
    async findOne(
        @Param('propertyId') mediaId: string,
        @GetUser() currentUser: User,
    ){
        return this.mediaService.getSingleMedia(mediaId, currentUser)
    }

    @Delete(":mediaId")
    @ApiResponse({schema: DeleteMediaResponseSchema})
    @Roles(UserRole.ADMIN, UserRole.DEPARTING_TENANT)
    async delete(
        @Param('mediaId') mediaId: string,
        @GetUser() currentUser: User,
    ){
        return this.mediaService.deleteMedia(mediaId, currentUser)
    }
}
