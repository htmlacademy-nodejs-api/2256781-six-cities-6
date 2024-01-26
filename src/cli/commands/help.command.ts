import chalk from 'chalk';
import { ICommand } from './command.interface.js';

export class HelpCommand implements ICommand {
  private readonly _name: string = '--help';

  public get name(): string {
    return this._name;
  }

  public async execute(..._parameters: string[]): Promise<void> {
    const versionCommand = chalk.whiteBright.bold('--version');
    const helpCommand = chalk.whiteBright.bold('--help');
    const importCommand = chalk.whiteBright.bold('--import <path>');
    const generateCommand = chalk.whiteBright.bold('--generate <n> <path> <url>');

    console.info(chalk.whiteBright(`
        Программа для подготовки данных для REST API сервера.
        Синтаксис:
            скрипт --<command> [--arguments]
        Примеры запуска:
            в продакте
            ./main.cli.js --generate 10 ./mocks/mock-offers.tsv http://localhost:3123/api
            ./main.cli.ts --generate 100 ./mocks/test-data.tsv http://127.0.0.1:3123/api
            ./main.cli.js --version
            в дэве
            npm run ts ./src/main.cli.ts -- --import ./mocks/mock-data.tsv
            npm run ts ./src/main.cli.ts
            npm run ts ./src/main.cli.ts -- --version
        Команды:
            ${versionCommand}:                   # выводит номер версии приложения из файла package.json
            ${helpCommand}:                      # печатает этот текст. Команда запускается по умолчанию
            ${importCommand}:             # импортирует данные из TSV файла.
                                           параметр:
                                           <path> - путь до tsv файла
            ${generateCommand}: # генерирует произвольное количество тестовых данных
                                           параметры:
                                           <count> -обязательный. Количество объявлений для генерации
                                           <filepath> - обязательный. Путь к файлу для записи результата
                                           <url> - обязательный. URL сервиса (JSON-server)
    `));
  }
}
