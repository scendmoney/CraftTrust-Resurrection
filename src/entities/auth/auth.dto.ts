import { UserModel } from '@entities/user/user.model';
import { DeepPartial } from 'typeorm';

export interface ICTX {
  user: DeepPartial<UserModel>;
  ipAddress: string;
  relations: string[];
  token?: string;
}

export interface IUpdateUserRedis {
  token: string;
  email?: string;
  phoneNumber?: string;
  publicAddress?: string;
}
