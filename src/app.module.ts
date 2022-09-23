import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { AppUpdate } from './app.update';
import { AppService } from './app.service';
import { sessionsMiddleware } from './middleware/sessions.middleware';
import { UsersModule } from './modules/users/users.module';
import { ContractsModule } from './modules/contracts/contracts.module';
import { CoinsModule } from './modules/coins/coins.module';
import { CoinEntity } from './modules/coins/models/coin.entity';
import { UserEntity } from './modules/users/models/user.entity';
import { ContractEntity } from './modules/contracts/models/contract.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TelegrafModule.forRoot({
      middlewares: [sessionsMiddleware],
      token: process.env.BOT_TOKEN,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([CoinEntity, UserEntity, ContractEntity]),
    UsersModule,
    ContractsModule,
    CoinsModule,
  ],
  providers: [AppService, AppUpdate],
})
export class AppModule {}
