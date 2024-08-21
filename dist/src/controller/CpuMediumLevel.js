"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cpuRandom_1 = __importDefault(require("./cpuRandom"));
class CpuMediumLevel {
    isCenterMoveFree(board) {
        return board.includes("5");
    }
    assinalateMove(avaliblePlays) {
        const fiveIndex = avaliblePlays.indexOf("5");
        const randomPlay = cpuRandom_1.default.getRandomInt(avaliblePlays.length);
        return this.isCenterMoveFree(avaliblePlays) ? fiveIndex : randomPlay;
    }
    verifyRowFree(avaliblePlays) {
        const patternsRowWin = [
            ['1', '2', '3'],
            ['4', '5', '6'],
            ['7', '8', '9']
        ];
        avaliblePlays.forEach();
    }
}
exports.default = CpuMediumLevel;
