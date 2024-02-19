import { inject, injectable } from 'inversify';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BaseController, HttpError, HttpMethod, ValidateDtoMiddleware } from '../../libs/index.js';
import { ILogger } from '../../libs/index.js';
import { Component, TConfigSchema } from '../../types/index.js';
import { TCreateUserRequest } from './create-user-request.type.js';
import { IUserService } from './user-service.interface.js';
import { IConfig } from '../../libs/index.js';
import { fillDTO } from '../../helpers/index.js';
import { UserRdo } from './rdo/user.rdo.js';
import { TLoginUserRequest } from './login-user-request.type.js';
import { CreateUserDto } from '../index.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: ILogger,
    @inject(Component.UserService) private readonly userService: IUserService,
    @inject(Component.Config) private readonly configService: IConfig<TConfigSchema>,
  ) {
    super(logger);
    this.logger.info('Register routes for UserController…');

    this.addRoute({
      path: '/register',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateUserDto)]
    });
    this.addRoute({ path: '/login', method: HttpMethod.Post, handler: this.login });
  }

  public async create(
    { body }: TCreateUserRequest,
    res: Response,
  ): Promise<void> {
    const existsUser = await this.userService.findUnique({ email: body.email });

    if (existsUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email «${body.email}» exists.`,
        'UserController'
      );
    }

    const result = await this.userService.create(body, this.configService.get('SALT'));
    this.created(res, fillDTO(UserRdo, result));
  }

  public async login(
    { body }: TLoginUserRequest,
    _res: Response,
  ): Promise<void> {
    const existsUser = await this.userService.findUnique({ email: body.email });

    if (!existsUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        `User with email ${body.email} not found.`,
        'UserController',
      );
    }

    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController',
    );
  }
}
