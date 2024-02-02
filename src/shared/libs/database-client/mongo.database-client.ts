import { inject, injectable } from 'inversify';
import { setTimeout } from 'node:timers/promises';
import { IDatabaseClient } from '../index.js';
import { Component } from '../../types/index.js';
import { ILogger } from '../index.js';
import * as Mongoose from 'mongoose';

const RETRY_COUNT = 5;
const RETRY_TIMEOUT = 1000;

@injectable()
export class MongoDatabaseClient implements IDatabaseClient {
  private isConnected = false;
  private mongoose!: typeof Mongoose;

  constructor(
    @inject(Component.Logger) private readonly logger: ILogger
  ) { }

  public get isConnectedToDatabase() {
    return this.isConnected;
  }

  public async connect(uri: string): Promise<void> {
    if (this.isConnectedToDatabase) {
      throw new Error('MongoDB client already connected');
    }

    this.logger.info('Trying to connect to MongoDB…');

    let attempt = 0;
    while (attempt < RETRY_COUNT) {
      try {
        this.mongoose = await Mongoose.connect(uri);
        this.isConnected = true;
        this.logger.info('Database connection established.');
        return;
      } catch (error) {
        attempt++;
        this.logger.error(`Failed to connect to the database. Attempt ${attempt}`, error as Error);
        await setTimeout(RETRY_TIMEOUT);
      }
    }
    throw new Error(`Unable to establish database connection after ${RETRY_COUNT}`);
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnectedToDatabase) {
      throw new Error('Not connected to the database');
    }

    if (!this.mongoose) {
      throw new Error('Instance not defined');
    }

    try {
      await this.mongoose.disconnect();
      this.isConnected = false;
      this.logger.info('Database connection closed.');
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error('The database connection could not be closed', error);
      }
      throw new Error('The database connection could not be closed');
    }
  }
}
