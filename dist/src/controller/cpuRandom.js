"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CpuRandom {
    static getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
}
exports.default = CpuRandom;
