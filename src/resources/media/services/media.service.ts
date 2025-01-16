import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import cloudinary from '../utils/media.utils'
import {Media} from "../entities/media.entity";
import {Property} from "../../properties/entities/property.entity";
import {CreateMediaDto} from "../dto/inbound/create-media.dto";
import {MediaFormat, MediaType} from "../types/media.enums";
import {User} from "../../users/entities/user.entity";
import {PropertyResponseDto} from "../../properties/dto/outbound/propertie_response.dto";
import {checkIfUserExists} from "../../users/utils/user.utils";
import {MediaResponseDto} from "../dto/outbound/media_response.dto";

@Injectable()
export class MediaService {
  constructor(
      @InjectRepository(Media)
      private readonly mediaRepository: Repository<Media>,
      @InjectRepository(Property)
      private readonly propertyRepository: Repository<Property>,
  ) {}

  private extractPublicIdFromUrl(url: string): string | null {
    const matches = url.match(/\/([^/]+)\.(jpg|jpeg|png|mp4)$/);
    return matches ? matches[1] : null;
  }

  async uploadMedia(createMediaDto: CreateMediaDto, currentUser: User, file: Express.Multer.File): Promise<Media> {
    checkIfUserExists(currentUser)

    const {  type, format, propertyId } = createMediaDto;

    const property = await this.propertyRepository.findOneBy({ id: propertyId})
    if (!property) {
       PropertyResponseDto.mapToPropertyNotFound()
    }

    const cloudinaryResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type:
                type === MediaType.IMAGE ? 'image' :
                    type === MediaType.VIDEO ? 'video' :
                        'raw',
            folder: 'properties',
          },
          (error, result) => {
            if (error) {
              reject(new Error('Failed to upload to Cloudinary'));
            }
            resolve(result);
          },
      );

      uploadStream.end(file.buffer);
    });

    const media = this.mediaRepository.create({
      url: cloudinaryResult.secure_url,
      type,
      format: format || MediaFormat.JPG,
      property,
    });

    return await this.mediaRepository.save(media);
  }

  async getSingleMedia(mediaId: string, currentUser: User): Promise<Media> {
    checkIfUserExists(currentUser)

    const media = await this.mediaRepository.findOne({
      where: { id: mediaId },
      relations: ['property'],
    })
    if (!media) {
      MediaResponseDto.mapToMediaNotFound()
    }
    return media;
  }

  async deleteMedia(mediaId: string, currentUser: User): Promise<void> {
    checkIfUserExists(currentUser)
    const media = await this.mediaRepository.findOne({
      where: { id: mediaId },
      relations: ['property'],
    });

    if (!media) {
      throw MediaResponseDto.mapToMediaNotFound();
    }

    const publicId = this.extractPublicIdFromUrl(media.url);

    if (publicId) {
      await cloudinary.uploader.destroy(publicId, {
        resource_type: media.type === MediaType.VIDEO ? 'video' : 'image',
      });
    }

    await this.mediaRepository.remove(media);
  }

  async findAllMedia(type?: MediaType): Promise<Media[]> {
    const query = this.mediaRepository.createQueryBuilder("media");

    if(type) {
      query.andWhere("media.type = :type", {type}, );
    }
  return query.getMany();
  }

}

