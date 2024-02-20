import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { IUserService, UpdateUserDto } from '../index.js';
import { UserEntity } from '../index.js';
import { CreateUserDto } from '../index.js';
import { Component } from '../../types/index.js';
import { ILogger } from '../../libs/index.js';
import { TUniqueQuery } from '../../types/index.js';

@injectable()
export class DefaultUserService implements IUserService {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>
  ) { }

  public async create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(dto);
    user.setPassword(dto.password, salt);

    const result = await this.userModel.create(user);
    this.logger.info(`New user created: ${user.email}`);

    return result;
  }

  public async findUnique(data: TUniqueQuery): Promise<DocumentType<UserEntity> | null> {
    return await this.userModel.findOne(data).exec();
  }

  public async findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const existedUser = await this.findUnique({ email: dto.email });

    if (existedUser) {
      return existedUser;
    }

    return this.create(dto, salt);
  }

  public async updateById(
    userId: string,
    dto: UpdateUserDto,
  ): Promise<DocumentType<UserEntity> | null> {
    return this.userModel
      .findByIdAndUpdate(userId, dto, { new: true })
      .populate(['favorites'])
      .exec();
  }
}
