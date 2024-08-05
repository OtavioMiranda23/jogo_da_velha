"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scoreboard = exports.GameResult = void 0;
var GameResult;
(function (GameResult) {
    GameResult["CPU"] = "cpu";
    GameResult["PLAYER"] = "player";
    GameResult["DRAW"] = "draw";
})(GameResult || (exports.GameResult = GameResult = {}));
class Scoreboard {
    constructor() {
        this.scoreboard = {
            cpu: 0,
            player: 0,
            draw: 0
        };
    }
    printScoreboard() {
        console.log("O placar está:");
        console.log(`Você: ${this.scoreboard.player}`);
        console.log(`CPU: ${this.scoreboard.cpu}`);
        console.log(`Empate: ${this.scoreboard.draw}`);
    }
    incrementValue(result) {
        this.scoreboard[result]++;
    }
}
exports.Scoreboard = Scoreboard;
