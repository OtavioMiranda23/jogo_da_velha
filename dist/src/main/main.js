"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
const board_1 = require("../board");
const cpu_1 = require("../cpu");
const gameStatusChecker_1 = require("../gameStatusChecker");
const boardPrinter_1 = require("../boardPrinter");
const scoreboard_1 = require("../scoreboard");
class Main {
    constructor(game, gameStatusChecker, boardPrinter, scoreboard) {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.game = game;
        this.gameStatusChecker = gameStatusChecker;
        this.isCpuTimeToPlay = false;
        this.boardPrinter = boardPrinter;
        this.scoreboard = scoreboard;
    }
    showInstructions() {
        console.log("Seja bem-vindo ao Jogo da Velha!!!");
        console.log("Para jogar, digite um número de 1 a 9 para inserir sua marcação =)");
    }
    validateMove(move) {
        if (!this.game.isMoveValid(move - 1)) {
            throw new Error("Erro: Movimento inválido. A casa selecionada já está ocupada.");
        }
        this.game.assignMove(move, true);
        this.isCpuTimeToPlay = !this.isCpuTimeToPlay;
    }
    validateInput(input) {
        const inputNormalize = parseInt(input);
        if (isNaN(inputNormalize) || inputNormalize < 1 || inputNormalize > 9) {
            throw new Error("Erro: entrada inválida. A entrada precisa ser um número disponível entre 1 e 9. Tente novamente.");
        }
        return inputNormalize;
    }
    continueGame() {
        this.rl.question("Aperte (1) para continuar jogando ou (0) para encerrar", (input) => {
            if (input === "1") {
                this.resetGame();
            }
            else if (input === "0") {
                this.rl.close();
            }
            else {
                console.error("Entrada incorreta, tente novamente");
                this.continueGame();
            }
        });
    }
    resetGame() {
        this.game.reset();
        this.promptUser();
    }
    handleWin() {
        const [result, message] = this.gameStatusChecker.giveMessageWinner();
        console.log(message);
        this.boardPrinter.printTable();
        this.scoreboard.incrementValue(result);
        this.scoreboard.printScoreboard();
        this.continueGame();
    }
    handleDraw() {
        console.log("O jogo empatou!");
        this.scoreboard.incrementValue(scoreboard_1.GameResult.DRAW);
        this.scoreboard.printScoreboard();
        this.continueGame();
    }
    build() {
        this.showInstructions();
        this.promptUser();
    }
    promptUser() {
        try {
            if (this.gameStatusChecker.checkIsWin()) {
                this.handleWin();
                return;
            }
            if (this.gameStatusChecker.checkIsDraw()) {
                this.handleDraw();
                return;
            }
            console.log(this.isCpuTimeToPlay ? "É a vez do CPU:" : "Sua vez:");
            if (!this.isCpuTimeToPlay) {
                this.boardPrinter.printTable();
            }
            try {
                const cpuPlay = new cpu_1.Cpu().genarateNumberPlay(this.game.getTable());
                if (this.isCpuTimeToPlay) {
                    this.game.assignMove(cpuPlay, false);
                    console.log("O CPU escolhe a casa: ", cpuPlay);
                    this.isCpuTimeToPlay = !this.isCpuTimeToPlay;
                    this.promptUser();
                    return;
                }
            }
            catch (err) {
                if (err instanceof Error) {
                    console.error(err.message);
                    this.rl.close();
                }
                else {
                    console.error("Ocorreu um erro desconhecido.");
                    this.rl.close();
                }
            }
            this.rl.question("Qual a sua jogada? (1-9) ", (play) => {
                try {
                    const playValidated = this.validateInput(play);
                    this.validateMove(playValidated);
                }
                catch (err) {
                    if (err instanceof Error) {
                        console.error(err.message);
                    }
                    else {
                        console.error("Ocorreu um erro desconhecido.");
                    }
                }
                this.promptUser();
            });
        }
        catch (err) {
            console.error("Ocorreu um erro inesperado:", err);
            this.rl.close();
        }
    }
}
const board = new board_1.Board();
const printer = new boardPrinter_1.BoardPrinter(board);
const checker = new gameStatusChecker_1.GameStatusChecker(board);
const scoreboard = new scoreboard_1.Scoreboard();
new Main(board, checker, printer, scoreboard).build();
