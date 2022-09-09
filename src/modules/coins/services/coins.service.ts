import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';

import { ICoin } from 'src/interfaces/coin.interface';
import { CoinEntity } from '../models/coin.entity';

// import { RolesEntity } from '../models/roles.entity';

@Injectable()
export class CoinsService {
  constructor(
    @InjectRepository(CoinEntity)
    private readonly coinsRepository: Repository<CoinEntity>,
  ) {}

  public getCoins(params?): Promise<CoinEntity[]> {
    return this.coinsRepository.find({
      where: { ...params },
    });
  }

  public getCoin(params): Promise<CoinEntity> {
    return this.coinsRepository.findOneBy({ ...params });
  }

  public createCoin(coin: ICoin): Promise<CoinEntity> {
    const newCoin = this.coinsRepository.create({ ...coin });
    return this.coinsRepository.save(newCoin);
  }

  public async deleteCoin(id: number) {
    const coin = await this.getCoin({ id });
    if (!coin) return null;
    return this.coinsRepository.delete({ id });
  }
}
