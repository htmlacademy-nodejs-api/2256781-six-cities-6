import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  BaseController,
  HttpError,
  HttpMethod,
  PrivateRouteMiddleware,
  UploadFileMiddleware,
  ValidateDtoMiddleware,
  ValidateObjectIdMiddleware,
} from '../../libs/index.js';
import { ILogger } from '../../libs/index.js';
import { Component, TConfigSchema } from '../../types/index.js';
import {
  FavoriteUserDto,
  IAuthService,
  IOfferService,
  LoggedUserRdo,
  OfferPreviewRdo,
  TCreateUserRequest,
  TFavoriteUserRequest,
} from '../index.js';
import { IUserService } from '../index.js';
import { IConfig } from '../../libs/index.js';
import { fillDTO } from '../../helpers/index.js';
import { UserRdo } from '../index.js';
import { TLoginUserRequest } from '../index.js';
import { CreateUserDto } from '../index.js';
import { LoginUserDto } from '../index.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: ILogger,
    @inject(Component.UserService) private readonly userService: IUserService,
    @inject(Component.Config) private readonly configService: IConfig<TConfigSchema>,
    @inject(Component.AuthService) private readonly authService: IAuthService,
    @inject(Component.OfferService) private readonly offerService: IOfferService,
  ) {
    super(logger);
    this.logger.info('Register routes for UserController…');

    this.addRoute({
      path: '/register',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateUserDto)]
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Post,
      handler: this.login,
      middlewares: [new ValidateDtoMiddleware(LoginUserDto)]
    });
    this.addRoute({
      path: '/:userId/avatar',
      method: HttpMethod.Post,
      handler: this.uploadAvatar,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('userId'),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'avatar'),
      ]
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Get,
      handler: this.checkAuthenticate,
    });
    this.addRoute({
      path: '/favorites',
      method: HttpMethod.Get,
      handler: this.getFavorites,
      middlewares: [new PrivateRouteMiddleware()],
    });
    this.addRoute({
      path: '/favorites',
      method: HttpMethod.Put,
      handler: this.updateFavorites,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(FavoriteUserDto),
      ],
    });
  }

  public async create(
    { body }: TCreateUserRequest,
    res: Response,
  ): Promise<void> {
    const existsUser = await this.userService.findUnique({ email: body.email });

    if (existsUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email «${body.email}» exists.`,
        'UserController'
      );
    }

    const result = await this.userService.create(body, this.configService.get('SALT'));
    this.created(res, fillDTO(UserRdo, result));
  }

  public async login(
    { body }: TLoginUserRequest,
    res: Response,
  ): Promise<void> {
    const user = await this.authService.verify(body);
    const token = await this.authService.authenticate(user);
    const responseData = fillDTO(LoggedUserRdo, {
      email: user.email,
      token,
    });
    this.ok(res, responseData);
  }

  public async uploadAvatar(req: Request, res: Response) {
    this.created(res, {
      filepath: req.file?.path
    });
  }

  public async checkAuthenticate({ tokenPayload: { email } }: Request, res: Response) {
    const foundedUser = await this.userService.findUnique({ email });

    if (!foundedUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController'
      );
    }

    this.ok(res, fillDTO(LoggedUserRdo, foundedUser));
  }

  public async getFavorites(
    { tokenPayload: { id: userId } }: Request,
    res: Response,
  ): Promise<void> {
    const offers = await this.offerService.find(userId, undefined, undefined, true);
    this.ok(res, fillDTO(OfferPreviewRdo, offers));
  }

  public async updateFavorites(
    { body, tokenPayload: { email, id: userId } }: TFavoriteUserRequest,
    res: Response,
  ): Promise<void> {
    if (!(await this.offerService.exists(body.offerId))) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${body.offerId} not found.`,
        'UserController',
      );
    }

    const foundedUser = await this.userService.findUnique({ email });

    if (!foundedUser) {
      throw new Error('User should be defined');
    }

    const favorites = new Set(foundedUser.favorites.map((offer) => offer.id));

    if (body.isFavorite) {
      favorites.add(body.offerId);
    } else {
      favorites.delete(body.offerId);
    }

    await this.userService.updateById(userId, {
      favorites: [...favorites],
    });

    this.noContent(res, null);
  }
}
