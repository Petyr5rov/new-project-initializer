import { ConsolePrinter } from '../core/console-printer.service';
import { ICommand } from '../types/command';
import { ExecutionResult } from '../types/execution-result';
import * as fse from 'fs-extra';

export abstract class Initializer implements ICommand {
  constructor(protected readonly consolePrinter: ConsolePrinter) {}
  public abstract execute(...args: any[]): Promise<ExecutionResult>;
  protected abstract updateJSON(...args: any[]): void;
  protected abstract makeFileTree(...args: any[]): void;
  protected writeJSON(data: any, adress: string): void {
    const jsonFile: string = JSON.stringify(data);
    fse.writeFile(adress, jsonFile);
  }
}
