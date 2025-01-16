import { AuditedEntity } from "src/core/entities/AuditedEntity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import {Country} from "./country.entity";
import {PropertyLocation} from "../../properties/entities/property-location.entity";

@Entity()
export class City extends AuditedEntity {
  constructor(partial: Partial<City>) {
    super();
    Object.assign(this, partial);
  }

  @Column({ nullable: false })
  name: string;

  @ManyToOne(() => Country, (country) => country.cities, {
    onUpdate: "CASCADE",
  })
  country: Country;

  @OneToMany(() => PropertyLocation, (property) => property.city, {
    onUpdate: "CASCADE",
  })
  propertyLocations: PropertyLocation[];
}
