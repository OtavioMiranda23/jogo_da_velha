"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cpu = void 0;
class Cpu {
    genarateNumberPlay(avaliblePlays) {
        const avaliblePlaysFiltered = avaliblePlays.filter(values => values !== "X" && values !== "O");
        if (!avaliblePlaysFiltered.length) {
            throw new Error("Não há mais jogadas disponíveis.");
        }
        return parseInt(avaliblePlaysFiltered[this.getRandomInt(avaliblePlaysFiltered.length)]);
    }
    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
}
exports.Cpu = Cpu;
