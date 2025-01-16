import { AfterUpdate, BeforeInsert, Column, PrimaryColumn } from "typeorm";
import * as moment from "moment";
import { v4 as uuid } from "uuid";

export abstract class AuditedEntity {
  @BeforeInsert()
  setAppliedAt() {
    if (!this.id) {
      this.id = uuid();
    }
    this.createdAt = moment().valueOf();
    this.updatedAt = moment().valueOf();
  }

  @AfterUpdate()
  setUpdatedAt() {
    this.updatedAt = moment().valueOf();
  }

  @PrimaryColumn({ nullable: false, unique: true })
  id: string;

  @Column({ type: "bigint" })
  createdAt: number;

  @Column({
    type: "bigint",
  })
  updatedAt: number;
}
