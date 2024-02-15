import { ICommand } from './command.interface.js';
import { EnvConfig, IConfig, TSVFileReader } from '../../shared/libs/index.js';
import { convertLineOfferToObject, createOffer, getErrorMessage, getMongoURI } from '../../shared/helpers/index.js';
import { CommentModel, DefaultCommentService, ICommentService } from '../../shared/modules/index.js';
import { DefaultOfferService, OfferModel, IOfferService } from '../../shared/modules/index.js';
import { IDatabaseClient, MongoDatabaseClient } from '../../shared/libs/index.js';
import { ILogger } from '../../shared/libs/index.js';
import { ConsoleLogger } from '../../shared/libs/index.js';
import { DefaultUserService, UserModel, IUserService } from '../../shared/modules/index.js';
import { IOffer, IUser, TConfigSchema } from '../../shared/types/index.js';

export class ImportCommand implements ICommand {
  private readonly _name: string = '--import';
  private readonly config: IConfig<TConfigSchema>;
  private userService: IUserService;
  private offerService: IOfferService;
  private commentService: ICommentService;
  private databaseClient: IDatabaseClient;
  private logger: ILogger;
  private salt?: string;

  constructor() {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.config = new EnvConfig(this.logger);
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.offerService = new DefaultOfferService(this.logger, OfferModel);
    this.commentService = new DefaultCommentService(this.logger, CommentModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  public get name(): string {
    return this._name;
  }

  private async onImportedLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    const userDocument = await this.findOrCreateUser(offer.user);
    const offerDocument = await this.saveOffer(offer, userDocument.id);
    await this.saveComments(line, userDocument.id, offerDocument.id);
    resolve();
  }

  private onCompleteImport(count: number): void {
    console.info(`${count} rows imported.`);
    this.databaseClient.disconnect();
  }

  private async findOrCreateUser(user: IUser) {
    return await this.userService.findOrCreate({
      ...user
    }, this.salt as string);
  }

  private async saveOffer(offer: IOffer, userId: string) {
    return await this.offerService.create({
      ...offer,
      userId,
      location: offer.location,
    });
  }

  private async saveComments(line: string, userId: string, offerId: string) {
    const { comments, rating } = convertLineOfferToObject(line);
    const texts = comments.split(';');

    const dtoComments = texts.map((text) => ({
      date: new Date(),
      text,
      rating: Number(rating),
      userId,
      offerId,
    }));

    for (const comment of dtoComments) {
      if (comment.text) {
        await this.commentService.create(comment);
      }
    }
  }

  public async execute(
    filename: string,
    login: string = this.config.get('DB_USER'),
    password: string = this.config.get('DB_PASSWORD'),
    host: string = this.config.get('DB_HOST'),
    port: string = this.config.get('DB_PORT'),
    base: string = this.config.get('DB_NAME'),
    salt: string = this.config.get('SALT')
  ): Promise<void> {
    const uri = getMongoURI({
      login,
      password,
      host,
      port,
      base
    });
    this.salt = salt;

    await this.databaseClient.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (error) {
      console.error(`Can't import data from file: ${filename}`);
      console.error(getErrorMessage(error));
    }
  }
}
