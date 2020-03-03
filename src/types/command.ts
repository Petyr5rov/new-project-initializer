import { ExecutionResult } from './execution-result';

export interface ICommand {
  execute(...args: any[]): Promise<ExecutionResult>;
}
