#!/usr/bin/env node
/* eslint-disable node/no-unsupported-features/es-syntax */
import { resolve } from 'node:path';
import { ICommand } from './cli/commands/command.interface.js';
import { CLIApplication } from './cli/index.js';
import { glob } from 'glob';

async function bootstrap() {
  const cliApplication = new CLIApplication();
  const importedCommands: ICommand[] = [];
  const files = glob.sync('src/cli/commands/*.command.ts');

  for (const file of files) {
    const path = resolve(file);
    const commandModule = await import(path);
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
