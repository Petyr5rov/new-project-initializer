"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Injector extends Map {
    resolve(target) {
        const tokens = Reflect.getMetadata('design:paramtypes', target) || [];
        const injections = tokens.map((token) => this.resolve(token));
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
exports.Injector = Injector;
