import { IPrinter } from './../types/core/printer';
import { Injectable } from '../tools/decorators/injectable';

@Injectable()
export class ConsolePrinter implements IPrinter {
  constructor() {
    //
  }
  public print(...texts: string[]) {
    console.log(...texts);
  }
}
