import * as moment from "moment";
import { AuditedEntity } from "src/core/entities/AuditedEntity";
import { BeforeInsert, Column, Entity, ManyToOne } from "typeorm";
import {User} from "./user.entity";

@Entity()
export class Otp extends AuditedEntity {
  constructor(partial: Partial<Otp>) {
    super();
    Object.assign(this, partial);
  }

  @Column({ nullable: false })
  code: number;

  @Column({ nullable: false, type: "bigint" })
  expiresOn: number;

  @ManyToOne(() => User, { onUpdate: "CASCADE" , onDelete: "CASCADE"})
  user: User;

  @BeforeInsert()
  setExpiresOn() {
    this.expiresOn = moment().add(10, "minutes").valueOf();
  }
}
