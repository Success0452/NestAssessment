import {AuditedEntity} from "../../../core/entities/AuditedEntity";
import {User} from "../../users/entities/user.entity";
import {Column, Entity, ManyToOne} from "typeorm";
import {PropertyType} from "../../properties/types/propertie.enums";

@Entity('saved_searches')
export class SavedSearch extends AuditedEntity{
    constructor(partial: Partial<User>) {
        super();
        Object.assign(this, partial);
    }

    @ManyToOne(() => User)
    user: User;

    @Column('jsonb')
    criteria: {
        location?: {
            city: string;
            state: string;
            radius?: number;
        };
        priceRange?: {
            min: number;
            max: number;
        };
        propertyType?: PropertyType[];
        bedrooms?: number;
        bathrooms?: number;
        features?: string[];
    };

    @Column({ default: true })
    notificationsEnabled: boolean;
}
