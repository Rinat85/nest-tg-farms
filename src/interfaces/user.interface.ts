import { UserRole } from './database.interface';

export interface IUser {
  id?: number;
  login: number;
  username: string;
  firstName?: string;
  lastName?: string;
  role?: UserRole;
  createdAt?: Date;
}
