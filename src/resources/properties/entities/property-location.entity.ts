import { AuditedEntity } from "src/core/entities/AuditedEntity";
import { Column, Entity, ManyToOne } from "typeorm";
import { Property } from "./property.entity";
import {City} from "../../users/entities/city.entity";

@Entity('property_locations')
export class PropertyLocation extends AuditedEntity {
    constructor(partial: Partial<PropertyLocation>) {
        super();
        Object.assign(this, partial);
    }

    @ManyToOne(() => Property, property => property.locations, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    property: Property;

    @Column({ nullable: true })
    address: string;

    @ManyToOne(() => City, (city) => city.propertyLocations, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    city: City;

    @Column({ nullable: true })
    nearestLandmark: string;

    @Column({ nullable: true })
    streetName: string;

    @Column({ nullable: true, type: "integer" })
    propertyNumber: number;
}
