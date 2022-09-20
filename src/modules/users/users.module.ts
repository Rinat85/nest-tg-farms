import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

import { UsersService } from './services/users.service';
import { UserEntity } from './models/user.entity';
import { StartScene } from './controllers/scenes/start.scene';
import { ContractsModule } from '../contracts/contracts.module';
import { TvlService } from './services/tvl.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => ContractsModule),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get('AXIOS_BSCSCAN_BASE_URI'),
        responseType: 'json',
        params: {
          module: 'account',
          apikey: configService.get('BSCSCAN_TOKEN'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [UsersService, StartScene, TvlService],
  exports: [UsersService],
})
export class UsersModule {}
