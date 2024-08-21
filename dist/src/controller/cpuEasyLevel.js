"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cpuRandom_1 = __importDefault(require("./cpuRandom"));
class CpuEasyLevel {
    giveRandomPlay(avaliblePlays) {
        const avaliblePlaysFiltered = avaliblePlays.filter(values => values !== "X" && values !== "O");
        if (!avaliblePlaysFiltered.length) {
            throw new Error("Não há mais jogadas disponíveis.");
        }
        const randomicPlay = cpuRandom_1.default.getRandomInt(avaliblePlaysFiltered.length);
        return parseInt(avaliblePlaysFiltered[randomicPlay]);
    }
}
exports.default = CpuEasyLevel;
