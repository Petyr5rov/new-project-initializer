import { Class } from '../../types/class-type';

export class Injector extends Map {

  public resolve<T>(target: Class<T>): T {
    const tokens = Reflect.getMetadata('design:paramtypes', target) || [];
    const injections = tokens.map((token: Class<any>) => this.resolve<any>(token));

    const classInstance = this.get(target);
    if (classInstance) {
      return classInstance;
    }

    const newClassInstance = new target(...injections);
    this.set(target, newClassInstance);

    // for debugging only
    // console.log(`DI-Container created class ${(newClassInstance as any).constructor.name}`);

    return newClassInstance;
  }

}
