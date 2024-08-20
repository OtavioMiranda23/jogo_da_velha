"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameStatusChecker = void 0;
const scoreboard_1 = require("./scoreboard");
class GameStatusChecker {
    constructor(board) {
        this.board = board;
    }
    checkIsWin() {
        const table = this.board.getTable();
        const winCases = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // linhas
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // colunas
            [0, 4, 8], [2, 4, 6] // diagonal
        ];
        return winCases.some((pattern) => {
            const [a, b, c] = pattern;
            return table[a] === table[b] && table[b] === table[c];
        });
    }
    giveMessageWinner() {
        const table = this.board.getTable();
        const winCases = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // linhas
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // colunas
            [0, 4, 8], [2, 4, 6] // diagonal
        ];
        const winPattern = winCases.filter((pattern) => {
            const [a, b, c] = pattern;
            return table[a] === table[b] && table[b] === table[c];
        });
        const winValues = [
            table[winPattern[0][0]],
            table[winPattern[0][1]],
            table[winPattern[0][2]],
        ];
        if (winValues.every(item => item === "X")) {
            return [scoreboard_1.GameResult.PLAYER, "Você venceu! Parabéns! =D"];
        }
        return [scoreboard_1.GameResult.CPU, "O CPU venceu =("];
    }
    checkIsDraw() {
        return !this.checkIsEmptyAssigns() && !this.checkIsWin();
    }
    checkIsEmptyAssigns() {
        const table = this.board.getTable();
        return table.some(cell => cell !== "X" && cell != "O");
    }
}
exports.GameStatusChecker = GameStatusChecker;
