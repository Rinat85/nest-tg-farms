import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContractsService } from './services/contracts.service';
import { ContractEntity } from './models/contract.entity';
import { AddContractAddressScene } from './controllers/scenes/add-contract-address.scene';
import { ContractScene } from './controllers/scenes/contract.scene';
import { AddContractCommandScene } from './controllers/scenes/add-contract-command.scene';

@Module({
  imports: [TypeOrmModule.forFeature([ContractEntity])],
  providers: [
    ContractsService,
    ContractScene,
    AddContractAddressScene,
    AddContractCommandScene,
  ],
})
export class ContractsModule {}
