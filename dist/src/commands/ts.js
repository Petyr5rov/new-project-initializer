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
const scripts_1 = require("../template/scripts");
const tsconfig_1 = require("../template/tsconfig");
const tslint_1 = require("../template/tslint");
const initializer_1 = require("./initializer");
let TsCommand = class TsCommand extends initializer_1.Initializer {
    constructor(consolePrinter) {
        super(consolePrinter);
    }
    execute({ name, lint, node, test, scripts, all }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dirName = name ? name : 'new-project';
                if (fse.existsSync(`./${dirName}`)) {
                    throw new Error(`Project with such name exists, please specify new one`);
                }
                const tsPacket = `typescript`;
                const lintPacket = `tslint tslint-microsoft-contrib`;
                const tsNodePacket = `ts-node @types/node`;
                const jasminePacket = `jasmine jasmine-ts jasmine-spec-reporter @types/jasmine`;
                const command = all
                    ? `npm i ${tsPacket} ${lintPacket} ${tsNodePacket} ${jasminePacket}`
                    : `npm i ${tsPacket} ${lint ? lintPacket : ''} ${node ? tsNodePacket : ''} ${test ? jasminePacket : ''}`;
                const util = require('util');
                const exec = util.promisify(require('child_process').exec);
                try {
                    this.consolePrinter.print('Creating file tree...');
                    this.makeFileTree(dirName, test, all);
                    this.consolePrinter.print('Initializining project...');
                    exec(`npm init -y`).then(() => {
                        this.consolePrinter.print('Writing files...');
                        this.updateJSON(lint, node, scripts, all);
                        this.consolePrinter.print('Installing packages...');
                        exec(`${command}`).then(() => this.consolePrinter.print(`\n\nYou are all set, happy coding :)`));
                    });
                }
                catch (error) {
                    throw new Error(error.message);
                }
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
    updateJSON(lint, node, scripts, all) {
        try {
            if (scripts || all) {
                fse.readFile('package.json', 'utf8', (err, data) => {
                    if (err) {
                        throw new Error(err.message);
                    }
                    const obj = JSON.parse(data);
                    obj.scripts = scripts_1.scriptsJSON;
                    super.writeJSON(obj, 'package.json');
                });
            }
            if (node || all) {
                this.writeJSON(tsconfig_1.tsconfig, 'tsconfig.json');
            }
            if (lint || all) {
                this.writeJSON(tslint_1.tslint, 'tslint.json');
            }
        }
        catch (err) {
            throw new Error(err.message);
        }
    }
    makeFileTree(dirName, test, all) {
        try {
            fse.mkdir(dirName);
            process.chdir(dirName);
            fse.writeFile('main.ts', '');
            fse.mkdirSync('src');
            process.chdir('src');
            fse.mkdir('core');
            fse.mkdir('types');
            if (test || all) {
                fse.mkdirSync('tests');
                fse.writeFile('./tests/test.ts', '');
            }
            process.chdir(`..`);
            fse.writeFile('./src/index.ts', '');
            fse.writeFile('./src/core/core.ts', '');
            fse.writeFile('./src/types/types.ts', '');
        }
        catch (err) {
            throw new Error(err.message);
        }
    }
};
TsCommand = __decorate([
    injectable_1.Injectable(),
    __metadata("design:paramtypes", [console_printer_service_1.ConsolePrinter])
], TsCommand);
exports.TsCommand = TsCommand;
