import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';


@Injectable()
export class TvlService {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  public getTvl(contractAddress: string, coinAddress: string): Observable<AxiosResponse> {
    const params = {
        action: 'tokenbalance',
        tag: 'latest',
    };
    const testurl = this.httpService
        .get('/api', {
            params: {
                ...params,
                contractaddress: coinAddress,
                address: contractAddress,
            }
        })
        .pipe(
            map(response => response.data),
        );
    // console.log('baseurl >>>', process.env.AXIOS_BSCSCAN_BASE_URI);
    console.log(testurl);
    return testurl;
  }

//   public getUser(params): Promise<IUser> {
//     return this.userRepository.findOneBy({ ...params });
//   }
}
