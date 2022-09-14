import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';

import { ContractEntity } from '../models/contract.entity';
import { IContract } from 'src/interfaces/contract.interface';

@Injectable()
export class ContractsService {
  constructor(
    @InjectRepository(ContractEntity)
    private readonly contractsRepository: Repository<ContractEntity>,
  ) {}

  public getContracts(params?): Promise<ContractEntity[]> {
    return this.contractsRepository.find({
      where: { ...params },
    });
  }

  public getContract(params): Promise<ContractEntity> {
    return this.contractsRepository.findOneBy({ ...params });
  }

  public createContract(contract: IContract): Promise<ContractEntity> {
    const newContract = this.contractsRepository.create({ ...contract });
    return this.contractsRepository.save(newContract);
  }

  public async deleteContract(id: number) {
    const contract = await this.getContract({ id });
    if (!contract) return null;
    return this.contractsRepository.delete({ id });
  }
}
