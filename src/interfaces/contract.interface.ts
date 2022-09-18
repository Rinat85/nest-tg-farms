import { ICoin } from './coin.interface';
import { IUser } from './user.interface';

export interface IContract {
  id?: number;
  address?: string;
  command?: string;
  user?: IUser;
  coin?: ICoin;
  createdAt?: Date;
}
