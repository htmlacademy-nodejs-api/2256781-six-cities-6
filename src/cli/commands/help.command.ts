import chalk from 'chalk';
import { ICommand } from './command.interface.js';

export class HelpCommand implements ICommand {
  public getName(): string {
    return '--help';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    const versionCommandParameter = chalk.blue.bold('--version');
    const helpCommandParameter = chalk.blue.bold('--help');
    const importCommandParameter = chalk.blue.bold('--import <path>');
    const generateCommandParameter = chalk.blue.bold('--generate <n> <path> <url>');

    console.info(chalk.blue(`
        Программа для подготовки данных для REST API сервера.
        Пример:
            cli.js --<command> [--arguments]
        Команды:
            ${versionCommandParameter}:                   # выводит номер версии приложения из файла package.json
            ${helpCommandParameter}:                      # печатает этот текст. Команда запускается по умолчанию
            ${importCommandParameter}:             # импортирует данные из TSV файла.
                                           параметр:
                                           <path> - путь до tsv файла
            ${generateCommandParameter}: # генерирует произвольное количество тестовых данных //TODO: описать подробнее после реализации
                                           параметры:
                                           <n> -
                                           <path> -
                                           <url> -
    `));
  }
}
