import { Request } from 'express';
import { TRequestBody, TRequestParams } from '../../../libs/index.js';
import { CreateOfferDto } from '../../index.js';

export type TCreateOfferRequest = Request<TRequestParams, TRequestBody, CreateOfferDto>;
