import { TSVFileReader } from '../../shared/libs/index.js';
import { ICommand } from './command.interface.js';

export class ImportCommand implements ICommand {
  public getName(): string {
    return '--import';
  }

  //! Реализовано не так как в классе VersionCommand. Здесь нет async
  //? Получается они будут работать по разному хоть реализуют один интерфейс или не прав? Если прав и работает по разному, то нормально ли когда при реализации одного интерфейса метод может быть реализован и как синхронный и как асинхронный в разных классах наследниках?
  //* имею ввиду код ниже будет блокировать ввод т.к. код Синхронный
  public execute(...parameters: string[]): void {
    const [filename] = parameters;

    if (!filename) {
      throw new Error('Command: ImportCommand. The file name is not specified');
    }

    const fileReader = new TSVFileReader(filename.trim());

    try {
      fileReader.read();
      console.log(fileReader.toArray());
    } catch (err) {

      if (!(err instanceof Error)) {
        throw err;
      }

      console.error(`Can't import data from file: ${filename}`);
      console.error(`Details: ${err.message}`);
    }
  }
}
