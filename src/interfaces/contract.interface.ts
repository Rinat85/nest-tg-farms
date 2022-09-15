import { ICoin } from "./coin.interface";
import { IUser } from "./user.interface";

export interface IContract {
  id?: number;
  address?: string;
  command?: string;
  userId?: IUser;
  coinId?: ICoin;
  createdAt?: Date;
}
