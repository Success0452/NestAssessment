import {JoinColumn, ManyToOne, Column, Entity} from "typeorm";
import {User} from "../../users/entities/user.entity";
import { Property} from "./property.entity";
import {AuditedEntity} from "../../../core/entities/AuditedEntity";

@Entity('user-property-interaction')
export class UserPropertyInteraction extends AuditedEntity {
    @ManyToOne(() => User, (user) => user.interactions)
    @JoinColumn()
    user: User;

    @ManyToOne(() => Property, (property) => property.interactions)
    @JoinColumn()
    property: Property;

    @Column()
    interactionType: 'viewed' | 'liked' |'saved';

    @Column()
    interactionDate: Date;

}