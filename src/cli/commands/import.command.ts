import { ICommand } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/index.js';
import { createOffer, getErrorMessage, getMongoURI } from '../../shared/helpers/index.js';
import { IUserService } from '../../shared/modules/index.js';
import { DefaultOfferService, OfferModel, IOfferService } from '../../shared/modules/index.js';
import { IDatabaseClient, MongoDatabaseClient } from '../../shared/libs/index.js';
import { ILogger } from '../../shared/libs/index.js';
import { ConsoleLogger } from '../../shared/libs/index.js';
import { DefaultUserService, UserModel } from '../../shared/modules/index.js';
import { DEFAULT_COMMAND_SETTINGS } from '../index.js';
import { IOffer } from '../../shared/types/index.js';

export class ImportCommand implements ICommand {
  private readonly _name: string = '--import';
  private userService: IUserService;
  private offerService: IOfferService;
  private databaseClient: IDatabaseClient;
  private logger: ILogger;
  private salt?: string;

  constructor() {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.offerService = new DefaultOfferService(this.logger, OfferModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  public get name(): string {
    return this._name;
  }

  private async onImportedLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
    this.databaseClient.disconnect();
  }

  private async saveOffer(offer: IOffer) {
    const { DEFAULT_USER_PASSWORD } = DEFAULT_COMMAND_SETTINGS;

    const user = await this.userService.findOrCreate({
      ...offer.user,
      password: DEFAULT_USER_PASSWORD
    }, this.salt as string);


    await this.offerService.create({
      ...offer,
      userId: user.id,
      location: JSON.stringify(offer.location),
    });
  }

  public async execute(filename: string, login: string, password: string, host: string, port: string, base: string, salt: string): Promise<void> {
    const { DEFAULT_DB_USER } = DEFAULT_COMMAND_SETTINGS;
    const dbLogin = login ?? DEFAULT_DB_USER;

    const { DEFAULT_DB_PASSWORD } = DEFAULT_COMMAND_SETTINGS;
    const dbPassword = password ?? DEFAULT_DB_PASSWORD;

    const { DEFAULT_DB_HOST } = DEFAULT_COMMAND_SETTINGS;
    const dbHost = host ?? DEFAULT_DB_HOST;


    const { DEFAULT_DB_PORT } = DEFAULT_COMMAND_SETTINGS;
    const dbPort = port ?? DEFAULT_DB_PORT;

    const { DEFAULT_DB_NAME } = DEFAULT_COMMAND_SETTINGS;
    const dbName = base ?? DEFAULT_DB_NAME;

    const { DEFAULT_USER_SALT } = DEFAULT_COMMAND_SETTINGS;
    this.salt = salt ?? DEFAULT_USER_SALT;

    const uri = getMongoURI({
      login: dbLogin,
      password: dbPassword,
      host: dbHost,
      port: dbPort,
      base: dbName,
    });

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
