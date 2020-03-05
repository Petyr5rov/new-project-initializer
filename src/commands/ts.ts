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
  constructor(private readonly consolePrinter: ConsolePrinter) {}

  public async execute({
    name,
    lint,
    node,
    test,
    scripts,
    all
  }: ITsCommandParameters): Promise<ExecutionResult> {
    try {
      const dirName: string = name ? name : 'new-project';
      if (fse.existsSync(`./${dirName}`)) {
        throw new Error(
          `Project with such name exists, please specify new one`
        );
      }

      const tsPacket: string = `typescript`;
      const lintPacket: string = `tslint tslint-microsoft-contrib`;
      const tsNodePacket: string = `ts-node @types/node`;
      const jasminePacket: string = `jasmine jasmine-ts jasmine-spec-reporter @types/jasmine`;
      const command: string = all
        ? `npm i ${tsPacket} ${lintPacket} ${tsNodePacket} ${jasminePacket}`
        : `npm i ${tsPacket} ${lint ? lintPacket : ''} ${
            node ? tsNodePacket : ''
          } ${test ? jasminePacket : ''}`;
      const exec = require('child_process').exec;
      try {
        fse.mkdir(dirName);
        process.chdir(dirName);
        fse.mkdirSync('src');
        process.chdir(`src`);
        fse.mkdir('core');
        fse.mkdir('types');
        test || all ? fse.mkdirSync('tests') : '';
        process.chdir(`..`);
        exec(`npm init -y && ${command}`);
        setTimeout(() => this.writeFiles(lint, node, test, scripts, all), 2000);
      } catch (error) {
        throw new Error(error.message);
      }
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
    test: boolean | undefined,
    scripts: boolean | undefined,
    all: boolean | undefined
  ) {
    const writeFile = (data: any, adress: string): void => {
      const jsonFile: string = JSON.stringify(data);
      fse.writeFile(adress, jsonFile);
    };
    fse.writeFile('main.ts', '');
    fse.writeFile('./src/index.ts', '');
    fse.writeFile('./src/core/core.ts', '');
    fse.writeFile('./src/types/types.ts', '');
    test || all ? fse.writeFile('./src/tests/test.ts', '') : '';

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
