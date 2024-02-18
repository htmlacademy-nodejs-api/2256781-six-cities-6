import { Request } from 'express';
import { TRequestBody, TRequestParams } from '../../../libs/index.js';
import { UpdateOfferDto } from '../dto/update-offer.dto.js';

export type TUpdateOfferRequest = Request<TRequestParams, TRequestBody, UpdateOfferDto>;
