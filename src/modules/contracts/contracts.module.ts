import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContractsService } from './services/contracts.service';
import { ContractEntity } from './models/contract.entity';
import { AddContractAddressScene } from './controllers/scenes/add-contract-address.scene';
import { ContractScene } from './controllers/scenes/contract.scene';
import { AddContractCommandScene } from './controllers/scenes/add-contract-command.scene';
import { AddContractCoinScene } from './controllers/scenes/add-contract-coin.scene';
import { CoinsModule } from '../coins/coins.module';
import { UsersModule } from '../users/users.module';
import { DeleteContractScene } from './controllers/scenes/delete-contract.scene';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContractEntity]),
    CoinsModule,
    forwardRef(() => UsersModule),
  ],
  providers: [
    ContractsService,
    ContractScene,
    AddContractAddressScene,
    AddContractCommandScene,
    AddContractCoinScene,
    DeleteContractScene,
  ],
  exports: [ContractsService],
})
export class ContractsModule {}
