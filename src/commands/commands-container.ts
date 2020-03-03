import { HelpCommand } from './help';
import { TsCommand } from './ts';
import { Injectable } from '../tools/decorators/injectable';

@Injectable()
export class CommandContainer {
  constructor(
    public readonly help: HelpCommand,
    public readonly ts: TsCommand
  ) {}
}
