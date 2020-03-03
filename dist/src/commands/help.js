"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const console_printer_service_1 = require("./../core/console-printer.service");
const injectable_1 = require("../tools/decorators/injectable");
let HelpCommand = class HelpCommand {
    constructor(printer = new console_printer_service_1.ConsolePrinter()) {
        this.printer = printer;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            this.printer.print(`
      Usage: npi <command>

      where <command> is one of:
        help, ts

      npi help                    prints this manual

      npi ts                      creates new TS project template folder and installs typescript, @types/typescript and @types/node
        arguments:
          --name                  Specifies the new project name
          --lint                  Installs tslint and tslint-microsoft-contrib to the project
          --node                  Installs ts-node and adds tsconfig.json to the project
          --test                  Installs jasmine, jasmine-ts, jasmine-spec-reporter and @types/jasmine
          -a (or --all)           Initializes project with all packages

        example:
          npi ts --lint --ts-node --test --filename=random100numbers.txt
      `);
            return { errors: 0, message: undefined };
        });
    }
};
HelpCommand = __decorate([
    injectable_1.Injectable(),
    __metadata("design:paramtypes", [console_printer_service_1.ConsolePrinter])
], HelpCommand);
exports.HelpCommand = HelpCommand;
