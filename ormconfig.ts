import { DataSource } from 'typeorm';
import { existsSync, readFileSync } from 'fs';
if (!existsSync(__dirname + '/.env-cmdrc.json')) {
  throw new Error('/.env-cmdrc.json not found');
}

const passFile = readFileSync(__dirname + '/.env-cmdrc.json');
const data = JSON.parse(passFile.toString());

const Data = new DataSource({
  url: data[process.env.PLATFORM_ENV.toUpperCase()]?.DB_URL,
  schema: data[process.env.PLATFORM_ENV.toUpperCase()]?.DB_SCHEMA || 'public',
  type: data[process.env.PLATFORM_ENV.toUpperCase()]?.DB_TYPE || 'postgres',
  name: 'default',
  synchronize: false,
  logging: true,
  entities: ['./src/entities/**/*.ts'],
  extra: { connectionLimit: 15 },
  migrations: [`./src/migrations/${process.env.PLATFORM_ENV}/*.ts`],
});

export default Data;
