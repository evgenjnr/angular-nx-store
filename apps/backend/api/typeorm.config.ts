import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import 'dotenv/config';

// config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT') || 5433,
  username: 'postgres',
  password: '123456',
  database: configService.get('DB_NAME') as string,
  entities: [__dirname + '/**/*.entity{.js,.ts}'],
  dropSchema: false,
  logging: true,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  synchronize: false,
});
