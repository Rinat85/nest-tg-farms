import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddCoinScene } from './controllers/scenes/add-coin.scene';
// import { CoinsUpdate } from './controllers/coins.update';
import { CoinScene } from './controllers/scenes/coin.scene';
import { DeleteCoinScene } from './controllers/scenes/delete-coin.scene';
import { CoinEntity } from './models/coin.entity';
// import { RolesEntity } from './models/roles.entity';
import { CoinsService } from './services/coins.service';

@Module({
  imports: [TypeOrmModule.forFeature([CoinEntity])],
  providers: [CoinsService, CoinScene, AddCoinScene, DeleteCoinScene],
  // exports: [RolesService],
})
export class CoinsModule {}
