import { AuditedEntity } from "src/core/entities/AuditedEntity";
import { Column, Entity, ManyToOne } from "typeorm";
import { MediaFormat, MediaType } from "../types/media.enums";
import {Property} from "../../properties/entities/property.entity";

@Entity()
export class Media extends AuditedEntity {
  constructor(partial: Partial<Media>) {
    super();
    Object.assign(this, partial);
  }

  @Column()
  url?: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({
    type: "enum",
    enum: MediaType,
    default: MediaType.IMAGE,
  })
  @Column({
    type: "enum",
    enum: MediaFormat,
    default: MediaFormat.JPG,
  })
  format: string;

  @Column({
    type: "enum",
    enum: MediaType,
  })
  type: MediaType;

  @ManyToOne(() => Property, (property) => property.media, {
    onUpdate: "CASCADE",
  })
  property: Property;
}
