import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContractsService } from './services/contracts.service';
import { ContractsUpdate } from './controllers/contracts.update';
import { ContractEntity } from './models/contract.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContractEntity])],
  providers: [ContractsService, ContractsUpdate],
})
export class ContractsModule {}
