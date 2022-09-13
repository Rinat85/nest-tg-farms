import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContractsService } from './services/contracts.service';
import { ContractsUpdate } from './controllers/contracts.update';
import { ContractEntity } from './models/contract.entity';
import { CreateContractScene } from './controllers/scenes/create-contract.scene';

@Module({
  imports: [TypeOrmModule.forFeature([ContractEntity])],
  providers: [ContractsService, ContractsUpdate, CreateContractScene],
})
export class ContractsModule {}
