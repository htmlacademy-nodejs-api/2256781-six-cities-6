import { inject, injectable } from 'inversify';
import * as crypto from 'node:crypto';
import { SignJWT } from 'jose';
import { IAuthService } from '../index.js';
import { Component } from '../../types/index.js';
import { ILogger } from '../../libs/index.js';
import {
  LoginUserDto,
  UserEntity,
  IUserService,
} from '../index.js';
import { TTokenPayload } from '../index.js';
import { IConfig } from '../../libs/index.js';
import { UserNotFoundException, UserPasswordIncorrectException } from '';
import { JWT_SETTINGS } from '../index.js';
import { TConfigSchema } from '../../types/index.js';

@injectable()
export class DefaultAuthService implements IAuthService {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.UserService) private readonly userService: IUserService,
    @inject(Component.Config) private readonly config: IConfig<TConfigSchema>,
  ) { }

  public async authenticate(user: UserEntity): Promise<string> {
    const jwtSecret = this.config.get('JWT_SECRET');
    const secretKey = crypto.createSecretKey(jwtSecret, 'utf-8');
    const tokenPayload: TTokenPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
      avatarUrl: user?.avatarUrl,
      type: user?.type
    };

    this.logger.info(`Create token for ${user.email}`);
    return new SignJWT(tokenPayload)
      .setProtectedHeader({ alg: JWT_SETTINGS.ALGORITHM })
      .setIssuedAt()
      .setExpirationTime(JWT_SETTINGS.EXPIRED)
      .sign(secretKey);
  }

  public async verify(dto: LoginUserDto): Promise<UserEntity> {
    const user = await this.userService.findUnique({ email: dto.email });
    if (!user) {
      this.logger.warn(`User with ${dto.email} not found`);
      throw new UserNotFoundException();
    }

    if (!user.verifyPassword(dto.password, this.config.get('SALT'))) {
      this.logger.warn(`Incorrect password for ${dto.email}`);
      throw new UserPasswordIncorrectException();
    }

    return user;
  }
}
