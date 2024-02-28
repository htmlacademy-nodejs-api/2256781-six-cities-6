import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import { ApplicationError, IExceptionFilter } from '../../index.js';
import { ILogger } from '../../index.js';
import { Component } from '../../../types/index.js';
import { createErrorObject } from '../../../helpers/index.js';

@injectable()
export class AppExceptionFilter implements IExceptionFilter {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger
  ) {
    this.logger.info('Register AppExceptionFilter');
  }

  public catch(error: Error, _req: Request, res: Response, _next: NextFunction): void {
    this.logger.error(error.message, error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(createErrorObject(ApplicationError.ServiceError, error.message));
  }
}
