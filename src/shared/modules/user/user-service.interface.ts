import { DocumentType } from '@typegoose/typegoose';
import { UpdateUserDto, UserEntity } from '../index.js';
import { CreateUserDto } from '../index.js';
import { TUniqueQuery } from '../../types/index.js';

export interface IUserService {
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findUnique(data: TUniqueQuery): Promise<DocumentType<UserEntity> | null>;
  findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  updateById(userId: string, dto: UpdateUserDto): Promise<DocumentType<UserEntity> | null>;
}
