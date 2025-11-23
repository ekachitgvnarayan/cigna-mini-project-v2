import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Payment } from '../database/entities/payment.entity';
import { Category } from '../database/entities/category.entity';
import { Audit } from '../database/entities/audit.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'oracle',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT ?? 1521),
  username: process.env.DB_USERNAME || 'miniproject',
  password: process.env.DB_PASSWORD || '123456',
  serviceName: process.env.DB_SID || 'FREEPDB1',
  synchronize: process.env.NODE_ENV !== 'production', // Auto-create tables in dev
  logging: process.env.NODE_ENV === 'development',
  entities: [Payment, Category, Audit],
};
