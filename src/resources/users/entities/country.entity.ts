import { AuditedEntity } from "src/core/entities/AuditedEntity";
import { Column, Entity, OneToMany } from "typeorm";
import {City} from "./city.entity";
import {CurrencyEnum} from "../types/user.enums";

@Entity()
export class Country extends AuditedEntity {
  constructor(partial: Partial<Country>) {
    super();
    Object.assign(this, partial);
  }

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  code: string;

  @OneToMany(() => City, (city) => city.country, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  cities: City[];

  @Column({ type: "enum", enum: CurrencyEnum, nullable: false })
  currency: CurrencyEnum;

  @Column({ nullable: true })
  region: string;
}
