import {AuditedEntity} from "../../../core/entities/AuditedEntity";
import {User} from "../../users/entities/user.entity";
import {Column, Entity, ManyToOne} from "typeorm";

@Entity('chat_sessions')
export class ChatSession extends AuditedEntity{
    constructor(partial: Partial<User>) {
        super();
        Object.assign(this, partial);
    }

    @ManyToOne(() => User)
    user: User;

    @Column('jsonb')
    aiContext: {
        intent: string;
        preferences: Record<string, never>;
        lastInteraction: Date;
        sessionData: Record<string, never>;
    };

    @Column('text', { array: true })
    conversationHistory: string[];
}
