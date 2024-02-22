import { Request } from 'express';
import { TRequestBody, TRequestParams } from '../../../libs/index.js';
import { FavoriteUserDto } from '../../index.js';

export type TFavoriteUserRequest = Request<TRequestParams, TRequestBody, FavoriteUserDto>;
