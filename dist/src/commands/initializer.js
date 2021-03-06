"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fse = __importStar(require("fs-extra"));
class Initializer {
    constructor(consolePrinter) {
        this.consolePrinter = consolePrinter;
    }
    writeJSON(data, adress) {
        const jsonFile = JSON.stringify(data);
        fse.writeFile(adress, jsonFile);
    }
}
exports.Initializer = Initializer;
