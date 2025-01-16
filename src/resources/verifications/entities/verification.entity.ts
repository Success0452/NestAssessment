import {Column, Entity, ManyToOne} from "typeorm";
import {User} from "../../users/entities/user.entity";
import {VerificationLevel} from "../../users/types/user.enums";
import {AuditedEntity} from "../../../core/entities/AuditedEntity";
import {VerificationStatus} from "../types/verification.enums";

@Entity('verifications')
export class Verification extends AuditedEntity{
    constructor(partial: Partial<User>) {
        super();
        Object.assign(this, partial);
    }

    @ManyToOne(() => User)
    user: User;

    @Column('jsonb')
    documents: {
        type: string;
        url: string;
        verificationStatus: VerificationStatus;
        notes: string;
    }[];

    @Column({
        type: 'enum',
        enum: VerificationLevel,
        enumName: 'verification_level_enum',
        default: VerificationLevel.BASIC
    })
    requestedLevel: VerificationLevel;

    @Column({
        type: 'enum',
        enum: VerificationStatus,
        default: VerificationStatus.PENDING
    })
    status: VerificationStatus;
}
