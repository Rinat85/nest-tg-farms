import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class TvlService {
  constructor(private readonly httpService: HttpService) {}

  public getTvl(
    contractAddress: string,
    coinAddress: string,
  ): Promise<AxiosResponse<any>> {
    const params = {
      action: 'tokenbalance',
      tag: 'latest',
    };
    return this.httpService.axiosRef.get('/api', {
      params: {
        ...params,
        contractaddress: coinAddress,
        address: contractAddress,
      },
    });
  }

  public getTvlWhereBnb(contractAddress: string): Promise<AxiosResponse<any>> {
    const params = {
      action: 'balance',
      tag: 'latest',
    };
    return this.httpService.axiosRef.get('/api', {
      params: {
        ...params,
        // contractaddress: coinAddress,
        address: contractAddress,
      },
    });
  }
  //   public getUser(params): Promise<IUser> {
  //     return this.userRepository.findOneBy({ ...params });
  //   }
}
