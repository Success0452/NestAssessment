import { AuditedEntity } from "src/core/entities/AuditedEntity";
import {Column, Entity, OneToMany, OneToOne} from "typeorm";
import {UserRole, VerificationLevel} from "../types/user.enums";
import {Property} from "../../properties/entities/property.entity";
import {Message} from "../../messages/entities/message.entity";
import {UserPropertyInteraction} from "../../properties/entities/user-property-interaction.entity";

@Entity('users')
export class User extends AuditedEntity {
  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true })
  phone: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.HOUSE_SEEKER })
  role: UserRole;

  @Column({ type: 'enum', enum: VerificationLevel, default: VerificationLevel.BASIC })
  verificationLevel: VerificationLevel;

  @Column({ default: false })
  isPhoneVerified: boolean;

  @Column({ default: false })
  isEmailVerified: boolean;

  @Column({ default: false })
  isSuspended: boolean;

  @Column({ nullable: true })
  profilePicture: string;

  @OneToMany(() => Property, property => property.owner)
  properties: Property[];

  @OneToMany(() => Message, message => message.sender)
  sentMessages: Message[];

  @OneToMany(() => Message, message => message.receiver)
  receivedMessages: Message[];

  @Column({ nullable: true })
  googleId?: string;

  @Column({ default: false })
  isGoogleAccount: boolean;

  @OneToMany(() => UserPropertyInteraction, (interaction) => interaction.user)
  interactions: UserPropertyInteraction[];
}
