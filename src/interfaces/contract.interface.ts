export interface IContract {
  id?: number;
  address: string;
  command: string;
  userId: number;
  coinId?: number;
  createdAt?: Date;
}
