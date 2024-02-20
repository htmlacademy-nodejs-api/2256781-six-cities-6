import { Request } from 'express';
import { TRequestBody, TRequestParams } from '../libs/index.js';
import { CreateCommentDto } from '../../shared/modules/index.js';

export type TCreateCommentRequest = Request<TRequestParams, TRequestBody, CreateCommentDto>;
