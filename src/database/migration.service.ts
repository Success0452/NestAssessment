import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";

@Injectable()
export class MigrationService {
  constructor(private datasource: DataSource) {}

  async runMigrations() {
    const migrations = await this.datasource.runMigrations();

    if (migrations.length) {
      console.log("Migrations run:");
      migrations.forEach((m) => console.log(`- ${m.name}`));
    } else {
      console.log("No migrations to run");
    }
  }
}
