import { inject, injectable } from 'inversify';
import { NextFunction, Request, Response } from 'express';
import { IExceptionFilter } from '../../index.js';
import { Component } from '../../../types/index.js';
import { ILogger } from '../../index.js';
import { HttpError } from '../../index.js';
import { createErrorObject } from '../../../helpers/index.js';
import { ApplicationError } from '../types/application-error.enum.js';

@injectable()
export class HttpErrorExceptionFilter implements IExceptionFilter {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger
  ) {
    this.logger.info('Register HttpErrorExceptionFilter');
  }

  public catch(error: unknown, req: Request, res: Response, next: NextFunction): void {
    if (!(error instanceof HttpError)) {
      return next(error);
    }

    this.logger.error(`[HttpErrorException]: ${req.path} # ${error.message}`, error);

    res
      .status(error.httpStatusCode)
      .json(createErrorObject(ApplicationError.CommonError, `${error.message},  ${error.detail}`));
  }
}
