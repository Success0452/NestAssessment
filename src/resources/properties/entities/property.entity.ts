import { AuditedEntity } from "../../../core/entities/AuditedEntity";
import { PropertyStatus, PropertyType } from "../types/propertie.enums";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Media } from "../../media/entities/media.entity";
import { PropertyLocation } from "./property-location.entity";
import { UserPropertyInteraction } from "./user-property-interaction.entity";

@Entity('properties')
export class Property extends AuditedEntity {
    constructor(partial: Partial<Property>) {
        super();
        Object.assign(this, partial);
    }

    @ManyToOne(() => User, user => user.properties)
    owner: User;

    @Column({
        type: 'enum',
        enum: PropertyType,
        default: PropertyType.APARTMENT
    })
    type: PropertyType;

    @Column()
    title: string;

    @Column('text')
    description: string;

    @Column('jsonb', { nullable: true })
    coordinates: {
        lat: number;
        lng: number;
    };

    @Column('jsonb')
    details: {
        bedrooms: number;
        bathrooms: number;
        features: string[];
        squareFootage: number;
    };

    @Column('jsonb')
    pricing: {
        rent: number;
        securityDeposit: number;
        otherFees: Record<string, number>;
    };

    @Column('jsonb')
    availability: {
        moveOutDate: Date;
        minimumLease: number;
        maximumLease: number;
    };

    @Column({ nullable: true })
    virtualTourUrl: string;

    @Column({ type: 'enum', enum: PropertyStatus, default: PropertyStatus.AVAILABLE })
    status: PropertyStatus;

    @Column({ type: 'float', default: 0 })
    aiMatchScore: number;

    @Column()
    date_listed: Date;

    @OneToMany(() => UserPropertyInteraction, (interaction) => interaction.property)
    interactions: UserPropertyInteraction[];

    @OneToMany(() => Media, (media) => media.property, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    media: Media[];

    @OneToMany(() => PropertyLocation, location => location.property, {
        cascade: true
    })
    locations: PropertyLocation[];
}
