import { IArgumentsParser } from './../types/core/arguments-parser';
import { CommandParameters } from './../types/command-parameters/command-parameters';
import minimist from 'minimist';
import { join } from 'path';

export class ArgumentsParser implements IArgumentsParser {

  private readonly _arguments: CommandParameters;
  private readonly _command: string;

  constructor() {
    const args = minimist(process.argv.slice(2));

    // get the command name
    this._command = args._[0];

    // initialize the parsed _arguments object
    this._arguments = {};

    // parse and validate individual _arguments
    if (args.name) {
      this._arguments.name = args.name;
    }
    if (args.lint) {
      this._arguments.lint = true;
    }
    if (args.node) {
      this._arguments.node = true;
    }
    if (args.test) {
      this._arguments.test = true;
    }
    if (args.scripts) {
      this._arguments.scripts = true;
    }
    if (args.a || args.all) {
      this._arguments.all = true;
    }
  }

  public get arguments(): CommandParameters {
    return this._arguments;
  }

  public get command(): string {
    return this._command;
  }

}
