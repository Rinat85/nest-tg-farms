import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContractsService } from './services/contracts.service';
import { ContractEntity } from './models/contract.entity';
import { AddContractAddressScene } from './controllers/scenes/add-contract-address.scene';
import { ContractScene } from './controllers/scenes/contract.scene';
import { AddContractCommandScene } from './controllers/scenes/add-contract-command.scene';
import { AddContractCoinScene } from './controllers/scenes/add-contract-coin.scene';
import { CoinsModule } from '../coins/coins.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContractEntity]), 
    CoinsModule, 
    UsersModule
  ],
  providers: [
    ContractsService,
    ContractScene,
    AddContractAddressScene,
    AddContractCommandScene,
    AddContractCoinScene
  ],
})
export class ContractsModule {}
