import {AuditedEntity} from "../../../core/entities/AuditedEntity";
import {Column, Entity, ManyToOne} from "typeorm";
import {User} from "../../users/entities/user.entity";

@Entity('messages')
export class Message extends AuditedEntity{
    constructor(partial: Partial<User>) {
        super();
        Object.assign(this, partial);
    }

    @ManyToOne(() => User, user => user.sentMessages)
    sender: User;

    @ManyToOne(() => User, user => user.receivedMessages)
    receiver: User;

    @Column('text')
    content: string;

    @Column({ default: false })
    isRead: boolean;

    @Column({ nullable: true })
    propertyId: string;
}
