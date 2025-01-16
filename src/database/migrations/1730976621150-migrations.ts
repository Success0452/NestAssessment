import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1730976621150 implements MigrationInterface {
    name = 'Migrations1730976621150'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user-property-interaction" ("id" character varying NOT NULL, "createdAt" bigint NOT NULL, "updatedAt" bigint NOT NULL, "interactionType" character varying NOT NULL, "interactionDate" TIMESTAMP NOT NULL, "userId" character varying, "propertyId" character varying, CONSTRAINT "PK_2184bc7cb9ea2cb5fb4502d988f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "properties" ADD "date_listed" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user-property-interaction" ADD CONSTRAINT "FK_3440ac81263fdbb86083668424b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user-property-interaction" ADD CONSTRAINT "FK_644a5df166e48e88214d719bfc8" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user-property-interaction" DROP CONSTRAINT "FK_644a5df166e48e88214d719bfc8"`);
        await queryRunner.query(`ALTER TABLE "user-property-interaction" DROP CONSTRAINT "FK_3440ac81263fdbb86083668424b"`);
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "date_listed"`);
        await queryRunner.query(`DROP TABLE "user-property-interaction"`);
    }

}
