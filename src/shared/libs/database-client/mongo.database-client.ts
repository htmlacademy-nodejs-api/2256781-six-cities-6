import { inject, injectable } from 'inversify';
import { setTimeout } from 'node:timers/promises';
import { IDatabaseClient } from '../index.js';
import { Component } from '../../types/index.js';
import { ILogger } from '../index.js';
import { RETRY_SETTINGS } from '../index.js';
import * as Mongoose from 'mongoose';

@injectable()
export class MongoDatabaseClient implements IDatabaseClient {
  private mongoose!: typeof Mongoose;

  constructor(
    @inject(Component.Logger) private readonly logger: ILogger
  ) { }

  public get isConnectedToDatabase(): boolean {
    return this.mongoose?.connection.readyState === 1;
  }

  public async connect(uri: string): Promise<void> {
    if (this.isConnectedToDatabase) {
      throw new Error('MongoDB client already connected');
    }

    this.logger.info('Trying to connect to MongoDB…');

    let attempt = 0;
    while (attempt < RETRY_SETTINGS.COUNT) {
      try {
        this.mongoose = await Mongoose.connect(uri);
        this.logger.info('A connection to the database has been established');
        return;
      } catch (error) {
        attempt++;
        this.logger.error(`Failed to connect to the database. Attempt ${attempt}. DEBUG: uri=${uri}`, error as Error);
        await setTimeout(RETRY_SETTINGS.TIMEOUT);
      }
    }
    throw new Error(`Failed to establish a database connection after ${RETRY_SETTINGS.COUNT}`);
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnectedToDatabase || !this.mongoose) {
      throw new Error('Did not connect to the database or Instance is not defined');
    }

    try {
      await this.mongoose.disconnect();
      this.logger.info('Database connection closed.');
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error('The database connection could not be closed', error);
      }
      throw new Error('The database connection could not be closed');
    }
  }
}
