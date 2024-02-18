import { Request } from 'express';
import { TRequestBody, TRequestParams } from '../../../libs/index.js';
import { CreateOfferDto } from '../dto/create-offer.dto.js';

export type TCreateOfferRequest = Request<TRequestParams, TRequestBody, CreateOfferDto>;
