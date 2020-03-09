#!/usr/bin/env node

import 'reflect-metadata';

import { CLI } from './src/cli';
import { Injector } from './src/tools/ioc/injector';

async function bootstrap() {
  const injector = new Injector();
  const app = injector.resolve(CLI);

  await app.main();
}

bootstrap();
