import { ConsolePrinter } from '../core/console-printer.service';
import { ICommand } from '../types/command';
import { ITsCommandParameters } from '../types/command-parameters/ts-command-parameters';
import { ExecutionResult } from '../types/execution-result';
import { Injectable } from '../tools/decorators/injectable';
import * as fse from 'fs-extra';

@Injectable()
export class TsCommand implements ICommand {
  constructor(
    private readonly consolePrinter: ConsolePrinter // progressbar
  ) {}

  public async execute({
    name,
    lint,
    node,
    test,
    all
  }: ITsCommandParameters): Promise<ExecutionResult> {
    try {
      const dirName = name? name:'New_Project';
      const tsPacket = `typescript`;
      const lintPacket = `tslint tslint-microsoft-contrib`;
      const tsNodePacket = `ts-node @types/node`;
      const jasminePacket = `jasmine jasmine-ts jasmine-spec-reporter @types/jasmine`;
      const command = all
      ? `npm i ${tsPacket} ${lintPacket} ${tsNodePacket} ${jasminePacket}`
      : `npm i ${tsPacket} ${lint? lintPacket:''} ${node? tsNodePacket:''} ${test? jasminePacket:''}`;
      const exec = require('child_process').exec;

      await fse.mkdir(dirName);
      process.chdir(dirName);
      await fse.mkdir('src');
      await exec(`npm init -y`);
      await exec(`${command}`, (error: { message: any; }, stdout: any, stderr: any) => {
          if (error) {
            this.consolePrinter.print(`error: ${error.message}`);
              return;
          }
          if (stderr) {
            this.consolePrinter.print(`stderr: ${stderr}`);
              return;
          }
          this.consolePrinter.print(`stdout: ${stdout}`);
      });

      return { errors: 0, message: undefined };
    } catch (error) {
      return {
        errors: 1,
        message: error.message
      };
    }
  }
}
