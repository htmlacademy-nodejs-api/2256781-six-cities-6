import { Request } from 'express';
import { TRequestBody, TRequestParams } from '../../../libs/index.js';
import { LoginUserDto } from '../../index.js';

export type TLoginUserRequest = Request<TRequestParams, TRequestBody, LoginUserDto>;
