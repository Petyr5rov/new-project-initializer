import { ConsolePrinter } from '../core/console-printer.service';
import { ICommand } from '../types/command';
import { ITsCommandParameters } from '../types/command-parameters/ts-command-parameters';
import { ExecutionResult } from '../types/execution-result';
import { Injectable } from '../tools/decorators/injectable';
import * as fse from 'fs-extra';
import { scriptsJSON } from '../template/scripts';
import { tsconfig } from '../template/tsconfig';
import { tslint } from '../template/tslint';

@Injectable()
export class TsCommand implements ICommand {
  constructor(
    private readonly consolePrinter: ConsolePrinter
  ) {}

  public async execute({
    name,
    lint,
    node,
    test,
    scripts,
    all
  }: ITsCommandParameters): Promise<ExecutionResult> {
    try {
      const dirName = name ? name : 'New_Project';
      const tsPacket = `typescript`;
      const lintPacket = `tslint tslint-microsoft-contrib`;
      const tsNodePacket = `ts-node @types/node`;
      const jasminePacket = `jasmine jasmine-ts jasmine-spec-reporter @types/jasmine`;
      const command = all
        ? `npm i ${tsPacket} ${lintPacket} ${tsNodePacket} ${jasminePacket}`
        : `npm i ${tsPacket} ${lint ? lintPacket : ''} ${
            node ? tsNodePacket : ''
          } ${test ? jasminePacket : ''}`;
      const exec = require('child_process').exec;
      fse.mkdir(dirName);
      process.chdir(dirName);
      fse.mkdir('src');
      exec(`npm init -y && ${command}`,
        (error: { message: any }, stdout: any, stderr: any) => {
          if (error) {
            this.consolePrinter.print(`error: ${error.message}`);
            return;
          }
          if (stderr) {
            this.consolePrinter.print(`stderr: ${stderr}`);
          }

        }
      );
      setTimeout(() => this.writeFiles(lint, node, scripts, all), 3000);
      return { errors: 0, message: undefined };
    } catch (error) {
      return {
        errors: 1,
        message: error.message
      };
    }
  }
  private writeFiles(
    lint: boolean | undefined,
    node: boolean | undefined,
    scripts: boolean | undefined,
    all: boolean | undefined
  ) {
    const writeFile = (obj: object, adress: string): void => {
      const jsonFile = JSON.stringify(obj);
      fse.writeFile(adress, jsonFile);
    };

    writeFile({}, 'main.ts');

    if (scripts || all) {
      fse.readFile('package.json', 'utf8', function readFileCallback(
        err,
        data
      ) {
        if (err) {
          throw new Error(err.message);
        } else {
          const obj = JSON.parse(data);
          obj.scripts = scriptsJSON;
          writeFile(obj, 'package.json');
        }
      });
    }

    if (node || all) {
      writeFile(tsconfig, 'tsconfig.json');
    }

    if (lint || all) {
      writeFile(tslint, 'tslint.json');
    }
  }
}
