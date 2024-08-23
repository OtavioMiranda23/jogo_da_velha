"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cpu = void 0;
var DifficultyLevel;
(function (DifficultyLevel) {
    DifficultyLevel[DifficultyLevel["EASY"] = 1] = "EASY";
    DifficultyLevel[DifficultyLevel["MEDIUM"] = 2] = "MEDIUM";
    DifficultyLevel[DifficultyLevel["HARD"] = 3] = "HARD";
})(DifficultyLevel || (DifficultyLevel = {}));
class Cpu {
    constructor(difficulty, easy, medium, board) {
        this.difficultyLevel = difficulty;
        this.cpuEasyLevel = easy;
        this.cpuMediumLevel = medium;
        this.board = board;
    }
    getBoard() {
        return this.board;
    }
    selectDifficulty(avaliblePlays) {
        switch (this.difficultyLevel) {
            case DifficultyLevel.EASY:
                this.cpuEasyLevel.giveRandomPlay(avaliblePlays);
                break;
            case DifficultyLevel.MEDIUM:
                this.cpuMediumLevel.assinalateMove(avaliblePlays);
            default:
                break;
        }
    }
}
exports.Cpu = Cpu;
