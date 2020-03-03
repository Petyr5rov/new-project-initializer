import { CommandParameters } from './../command-parameters/command-parameters';

export interface IArgumentsParser {
  command: string;
  arguments: CommandParameters;
}
