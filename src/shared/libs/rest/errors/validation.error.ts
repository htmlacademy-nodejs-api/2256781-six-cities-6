import { StatusCodes } from 'http-status-codes';
import { HttpError } from './http-error.js';
import { TValidationErrorFields } from '../../index.js';

export class ValidationError extends HttpError {
  public details: TValidationErrorFields = [];

  constructor(message: string, errors: TValidationErrorFields) {
    super(StatusCodes.BAD_REQUEST, message);
    this.details = errors;
  }
}
