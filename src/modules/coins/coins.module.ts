import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoinsUpdate } from './controllers/coins.update';
import { CoinEntity } from './models/coin.entity';
// import { RolesEntity } from './models/roles.entity';
import { CoinsService } from './services/coins.service';

@Module({
  imports: [TypeOrmModule.forFeature([CoinEntity])],
  providers: [CoinsService, CoinsUpdate],
  // exports: [RolesService],
})
export class CoinsModule {}
