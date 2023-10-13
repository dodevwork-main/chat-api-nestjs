import { DataSource } from 'typeorm'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import 'dotenv/config'

export const databaseConfig: PostgresConnectionOptions = {
  type: 'postgres',
  entities: [__dirname + '/entities/*.entity.{js,ts}'],
  migrations: [__dirname + '/migrations/*.{js,ts}'],
  subscribers: [__dirname + '/subscribers/*.{js,ts}'],
  synchronize: false,
  migrationsRun: true,
  connectTimeoutMS: 10000, // 10 seconds
  host: process.env.DB_HOSTNAME || 'localhost',
  port: parseInt(process.env.DB_PORT || '5412'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'pass123',
  database: process.env.DB_DATABASE_NAME || 'postgres',
}

// this export is used by TypeORM commands in package.json#scripts
export const dataSource = new DataSource(databaseConfig)
