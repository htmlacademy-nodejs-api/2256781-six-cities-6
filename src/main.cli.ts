#!/usr/bin/env node
/* eslint-disable node/no-unsupported-features/es-syntax */
import 'reflect-metadata';
import * as fs from 'node:fs';
import path from 'node:path';
import { config } from 'dotenv';
import { ICommand } from './cli/index.js';
import { CLIApplication } from './cli/index.js';

async function bootstrap() {
  config();

  const cliApplication = new CLIApplication();
  const importedCommands: ICommand[] = [];
  const files = fs.readdirSync('src/cli/commands').filter((fn) => fn.endsWith('.command.ts'));

  for (const file of files) {
    const source = path.join(path.resolve(), '/src/cli/commands', file);
    const commandModule = await import(source);
    const objectKeys = Object.keys(commandModule);

    objectKeys.forEach((key) => {
      const exportedEntity = commandModule[key];
      if (exportedEntity.prototype && typeof exportedEntity.prototype.execute === 'function') {
        const commandInstance = new exportedEntity();
        importedCommands.push(commandInstance);
      }
    });
  }

  cliApplication.registerCommands(importedCommands);
  cliApplication.processCommand(process.argv);
}

bootstrap();
