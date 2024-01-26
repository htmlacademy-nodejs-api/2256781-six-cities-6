import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { ICommand } from './command.interface.js';
import chalk from 'chalk';

type TPackageJSONConfig = {
  version: string;
}

function isPackageJSONConfig(value: unknown): value is TPackageJSONConfig {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    Object.hasOwn(value, 'version')
  );
}

export class VersionCommand implements ICommand {
  private readonly filePath: string = './package.json';
  private readonly _name: string = '--version';

  private readVersion(): string {
    const jsonContent = readFileSync(resolve(this.filePath), 'utf-8');
    const importedContent: unknown = JSON.parse(jsonContent);

    if (!isPackageJSONConfig(importedContent)) {
      throw new Error('Failed to parse json content.');
    }

    return importedContent.version;
  }

  public get name(): string {
    return this._name;
  }

  public async execute(..._parameters: string[]): Promise<void> {
    try {
      const version = this.readVersion();
      console.log(chalk.yellow.bold(version));
    } catch (error: unknown) {
      console.error(`Failed to read version from ${this.filePath}`);

      if (error instanceof Error) {
        console.error(chalk.yellow.bold(error.message));
      }
    }
  }
}
