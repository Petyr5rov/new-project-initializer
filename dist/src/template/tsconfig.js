"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tsconfig = {
    compilerOptions: {
        target: 'es6',
        module: 'commonjs',
        lib: ['DOM', 'ES2015'],
        outDir: './dist',
        downlevelIteration: true,
        strict: true,
        esModuleInterop: true,
        experimentalDecorators: true,
        emitDecoratorMetadata: true
    }
};
