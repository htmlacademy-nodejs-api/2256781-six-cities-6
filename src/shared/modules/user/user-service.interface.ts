import { DocumentType } from '@typegoose/typegoose';
import { UserEntity } from './user.entity.js';
import { CreateUserDto } from '../index.js';
import { TUniqueQuery } from '../../types/index.js';

export interface IUserService {
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findUnique(data: TUniqueQuery): Promise<DocumentType<UserEntity> | null>;
  findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  login(email: string, password: string): Promise<DocumentType<UserEntity> | null>
  logout(token: string): void;
  check(token: string): void;
}
