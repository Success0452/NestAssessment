import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.development" });

export const PostgresConfig = {
  type: process.env.db_type,
  host: process.env.db_host,
  port: process.env.db_port,
  username: process.env.db_username,
  password: process.env.db_password,
  database: process.env.database,
  entities: [join(__dirname, "../resources/**/*.entity{.ts,.js}")],
  migrations: [join(__dirname, "./migrations/*{.ts,.js}")],
  subscribers: [
    join(__dirname, "../resources/**/*.entity.subscriber{.ts,.js}"),
  ],
} as TypeOrmModuleOptions;
