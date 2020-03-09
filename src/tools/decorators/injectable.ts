/* tslint:disable */
import { Class } from '../../types/class-type';

export const Injectable = (): (target: Class<any>) => void =>
  (target: Class<any>) => {
    // for debugging and tracing injectables only
    // console.log(`${target.name} is now injectable`);
  };
