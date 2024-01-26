import { ICommand } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/index.js';
import { createOffer, getErrorMessage } from '../../shared/helpers/index.js';

export class ImportCommand implements ICommand {
  private readonly _name: string = '--import';

  public get name(): string {
    return this._name;
  }

  private onImportedLine(line: string) {
    const offer = createOffer(line);
    console.info(offer);
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [filename] = parameters;
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
