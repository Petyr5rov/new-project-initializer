import { ConsolePrinter } from '../core/console-printer.service';
import { ICommand } from '../types/command';
import { ITsCommandParameters } from '../types/command-parameters/ts-command-parameters';
import { ExecutionResult } from '../types/execution-result';
import { Injectable } from '../tools/decorators/injectable';
import * as fse from 'fs-extra';
import { scriptsJSON } from '../template/scripts';
import { tsconfig } from '../template/tsconfig';
import { tslint } from '../template/tslint';
import { Initializer } from './initializer';

@Injectable()
export class TsCommand extends Initializer implements ICommand {
  constructor(consolePrinter: ConsolePrinter) {
    super(consolePrinter);
  }

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
      const util = require('util');
      const exec = util.promisify(require('child_process').exec);
      try {
        this.consolePrinter.print('Creating file tree...');
        this.makeFileTree(dirName, test, all);
        this.consolePrinter.print('Initializining project...');
        exec(`npm init -y`).then(() => {
          this.consolePrinter.print('Writing files...');
          this.updateJSON(lint, node, scripts, all);
          this.consolePrinter.print('Installing packages...');
          exec(`${command}`).then(() =>
            this.consolePrinter.print(`\n\nYou are all set, happy coding :)`)
          );
        });
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
  protected updateJSON(
    lint: boolean | undefined,
    node: boolean | undefined,
    scripts: boolean | undefined,
    all: boolean | undefined
  ) {
    try {
      if (scripts || all) {
        fse.readFile('package.json', 'utf8', (err: any, data: string): void => {
          if (err) {
            throw new Error(err.message);
          }
          const obj = JSON.parse(data);
          obj.scripts = scriptsJSON;
          super.writeJSON(obj, 'package.json');
        });
      }
      if (node || all) {
        this.writeJSON(tsconfig, 'tsconfig.json');
      }
      if (lint || all) {
        this.writeJSON(tslint, 'tslint.json');
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }
  protected makeFileTree(
    dirName: string,
    test: boolean | undefined,
    all: boolean | undefined
  ) {
    try {
      fse.mkdir(dirName);
      process.chdir(dirName);
      fse.writeFile('main.ts', '');
      fse.mkdirSync('src');
      process.chdir('src');
      fse.mkdir('core');
      fse.mkdir('types');
      if (test || all) {
        fse.mkdirSync('tests');
        fse.writeFile('./tests/test.ts', '');
      }
      process.chdir(`..`);
      fse.writeFile('./src/index.ts', '');
      fse.writeFile('./src/core/core.ts', '');
      fse.writeFile('./src/types/types.ts', '');
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
