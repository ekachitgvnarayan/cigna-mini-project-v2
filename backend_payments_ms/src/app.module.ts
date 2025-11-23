import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';
import { typeOrmConfig } from './config/database.config';
import { PaymentsModule } from './payments/payments.module';
import { CategoriesModule } from './categories/categories.module';
import { AuditsModule } from './audits/audits.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    PaymentsModule,
    CategoriesModule,
    AuditsModule,
  ],
})
export class AppModule {}
