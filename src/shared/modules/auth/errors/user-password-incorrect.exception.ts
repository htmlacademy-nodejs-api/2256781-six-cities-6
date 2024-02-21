import { StatusCodes } from 'http-status-codes';
import { BaseUserException } from '../../index.js';

export class UserPasswordException extends BaseUserException {
  constructor() {
    super(StatusCodes.UNAUTHORIZED, 'Incorrect user name or password');
  }
}
