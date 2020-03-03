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
const arguments_parser_service_1 = require("./core/arguments-parser.service");
const commands_container_1 = require("./commands/commands-container");
const console_printer_service_1 = require("./core/console-printer.service");
const injectable_1 = require("./tools/decorators/injectable");
let CLI = class CLI {
    constructor(parser = new arguments_parser_service_1.ArgumentsParser(), printer = new console_printer_service_1.ConsolePrinter(), commandContainer) {
        this.parser = parser;
        this.printer = printer;
        this.commandContainer = commandContainer;
    }
    main() {
        return __awaiter(this, void 0, void 0, function* () {
            const command = this.parser.command;
            const args = this.parser.arguments;
            if (this.commandContainer[command] && typeof this.commandContainer[command].execute === 'function') {
                const executionResult = yield this.commandContainer[command].execute(args);
                if (executionResult.errors) {
                    this.printer.print(executionResult.message);
                }
            }
        });
    }
};
CLI = __decorate([
    injectable_1.Injectable(),
    __metadata("design:paramtypes", [arguments_parser_service_1.ArgumentsParser,
        console_printer_service_1.ConsolePrinter,
        commands_container_1.CommandContainer])
], CLI);
exports.CLI = CLI;
