export interface ICommand {
  get name(): string;
  execute(...parameters: string[]): void;
}
