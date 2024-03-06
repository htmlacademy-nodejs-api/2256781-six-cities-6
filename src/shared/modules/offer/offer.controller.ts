import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import {
  BaseController,
  ValidateDtoMiddleware,
  ValidateObjectIdMiddleware,
  DocumentExistsMiddleware,
  PrivateRouteMiddleware,
} from '../../libs/index.js';
import { ILogger } from '../../libs/index.js';
import { Component, HttpMethod } from '../../types/index.js';
import { fillDTO } from '../../helpers/index.js';
import { IOfferService, OfferPreviewRdo, ParamCityName } from '../index.js';
import { TCreateOfferRequest } from '../index.js';
import {
  CommentRdo,
  CreateOfferDto,
  ICommentService,
  OfferRdo,
  ParamOfferId,
  UpdateOfferDto,
} from '../index.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: ILogger,
    @inject(Component.OfferService) private readonly offerService: IOfferService,
    @inject(Component.CommentService) private readonly commentService: ICommentService
  ) {
    super(logger);
    this.logger.info('Register routes for OfferController…');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });

    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto)
      ]
    });

    this.addRoute({
      path: '/favorites',
      method: HttpMethod.Get,
      handler: this.getFavorites,
      middlewares: [new PrivateRouteMiddleware()],
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });

    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });

    this.addRoute({
      path: '/:city/premium',
      method: HttpMethod.Get,
      handler: this.getPremium,
    });
  }

  public async index(req: Request, res: Response): Promise<void> {
    const limit: number | undefined = isNaN(Number(req.query?.limit as string)) ? undefined : Number(req.query.limit);

    const { id: userId } = req.tokenPayload;
    const offers = await this.offerService.find({ limit, userId });
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async show(req: Request, res: Response): Promise<void> {
    const { offerId } = req.params;
    const { id: userId } = req.tokenPayload;
    const offers = await this.offerService.find({ userId, offerId });
    this.ok(res, fillDTO(OfferRdo, offers[0]));
  }

  public async create(
    { body, tokenPayload }: TCreateOfferRequest,
    res: Response,
  ): Promise<void> {
    const result = await this.offerService.create({ ...body, userId: tokenPayload.id });
    const offers = await this.offerService.find({ offerId: result.id });
    this.created(res, fillDTO(OfferRdo, offers[0]));
  }

  public async delete({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const offers = await this.offerService.find({ offerId });
    await this.offerService.deleteById(offerId);
    await this.commentService.deleteByOfferId(offerId);
    this.noContent(res, offers[0]);
  }

  public async update({ body, params }: Request<ParamOfferId, unknown, UpdateOfferDto>, res: Response): Promise<void> {
    const updatedOffer = await this.offerService.updateById(params.offerId, body);
    const offers = await this.offerService.find({ offerId: updatedOffer?.id });
    this.ok(res, fillDTO(OfferRdo, !offers.length ? null : offers[0]));
  }

  public async getComments({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const comments = await this.commentService.findByOfferId(params.offerId);
    this.ok(res, fillDTO(CommentRdo, comments));
  }

  public async getPremium({ params: { city } }: Request<ParamCityName>, res: Response): Promise<void> {
    const offers = await this.offerService.findPremiumByCity(city);
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async getFavorites(
    { tokenPayload: { id: userId } }: Request,
    res: Response,
  ): Promise<void> {
    const offers = await this.offerService.find({ userId, isFavoriteOnly: true });
    this.ok(res, fillDTO(OfferPreviewRdo, offers));
  }
}
