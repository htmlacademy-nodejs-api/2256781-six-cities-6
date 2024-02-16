import { inject, injectable } from 'inversify';
import { Response as IResponse } from 'express';
import { BaseController, HttpMethod } from '../../libs/index.js';
import { ILogger } from '../../libs/index.js';
import { Component } from '../../types/index.js';
import { TCreateUserRequest } from './create-user-request.type.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: ILogger,
  ) {
    super(logger);
    this.logger.info('Register routes for UserController…');

    this.addRoute({ path: '/register', method: HttpMethod.Post, handler: this.create });
  }

  public async create(
    _req: TCreateUserRequest,
    _res: IResponse
  ): Promise<void> {
    throw new Error('[UserController] Oops');
  }
}
