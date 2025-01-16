import { PostgresConfig } from "./postgres.config";
import { DataSource, DataSourceOptions } from "typeorm";

export const AppDataSource = new DataSource(
  PostgresConfig as DataSourceOptions,
);
