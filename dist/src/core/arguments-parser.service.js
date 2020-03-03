"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const minimist_1 = __importDefault(require("minimist"));
class ArgumentsParser {
    constructor() {
        const args = minimist_1.default(process.argv.slice(2));
        // get the command name
        this._command = args._[0];
        // initialize the parsed _arguments object
        this._arguments = {};
        // parse and validate individual _arguments
        if (args.name) {
            this._arguments.name = args.name;
        }
        if (args.lint) {
            this._arguments.lint = true;
        }
        if (args.node) {
            this._arguments.node = true;
        }
        if (args.test) {
            this._arguments.test = true;
        }
        if (args.scripts) {
            this._arguments.scripts = true;
        }
        if (args.a || args.all) {
            this._arguments.all = true;
        }
    }
    get arguments() {
        return this._arguments;
    }
    get command() {
        return this._command;
    }
}
exports.ArgumentsParser = ArgumentsParser;
