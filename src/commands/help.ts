import { ConsolePrinter } from './../core/console-printer.service';
import { ICommand } from './../types/command';
import { ExecutionResult } from '../types/execution-result';
import { Injectable } from '../tools/decorators/injectable';

@Injectable()
export class HelpCommand implements ICommand {

  constructor(
    private readonly printer: ConsolePrinter = new ConsolePrinter(),
  ) { }

  public async execute(): Promise<ExecutionResult> {
    this.printer.print(
      `
      Usage: npi <command>

      where <command> is one of:
        ts, help

      npi help                    prints this manual

      npi ts                      creates new TS project template folder and installs typescript, @types/typescript and @types/node
        arguments:
          --name                  Specifies the new project name
          --lint                  Installs tslint and tslint-microsoft-contrib to the project and adds tslint.json
          --node                  Installs ts-node and adds tsconfig.json to the project
          --test                  Installs jasmine, jasmine-ts, jasmine-spec-reporter and @types/jasmine
          --scripts               Add scripts to package.json file
          -a (or --all)           Initializes project with all packages

        example:
          npi ts --lint --ts-node --test
      `
    );

    return { errors: 0, message: undefined };
  }

}