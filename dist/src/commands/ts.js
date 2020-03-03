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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const console_printer_service_1 = require("../core/console-printer.service");
const injectable_1 = require("../tools/decorators/injectable");
const fse = __importStar(require("fs-extra"));
let TsCommand = class TsCommand {
    constructor(consolePrinter // progressbar
    ) {
        this.consolePrinter = consolePrinter;
    }
    execute({ name, lint, node, test, all }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dirName = name ? name : 'New_Project';
                const tsPacket = `typescript`;
                const lintPacket = `tslint tslint-microsoft-contrib`;
                const tsNodePacket = `ts-node @types/node`;
                const jasminePacket = `jasmine jasmine-ts jasmine-spec-reporter @types/jasmine`;
                const command = all
                    ? `npm i ${tsPacket} ${lintPacket} ${tsNodePacket} ${jasminePacket}`
                    : `npm i ${tsPacket} ${lint ? lintPacket : ''} ${node ? tsNodePacket : ''} ${test ? jasminePacket : ''}`;
                const exec = require('child_process').exec;
                yield fse.mkdir(dirName);
                process.chdir(dirName);
                yield fse.mkdir('src');
                yield exec(`npm init -y`);
                yield exec(`${command}`, (error, stdout, stderr) => {
                    if (error) {
                        this.consolePrinter.print(`error: ${error.message}`);
                        return;
                    }
                    if (stderr) {
                        this.consolePrinter.print(`stderr: ${stderr}`);
                        return;
                    }
                    this.consolePrinter.print(`stdout: ${stdout}`);
                });
                return { errors: 0, message: undefined };
            }
            catch (error) {
                return {
                    errors: 1,
                    message: error.message
                };
            }
        });
    }
};
TsCommand = __decorate([
    injectable_1.Injectable(),
    __metadata("design:paramtypes", [console_printer_service_1.ConsolePrinter // progressbar
    ])
], TsCommand);
exports.TsCommand = TsCommand;
