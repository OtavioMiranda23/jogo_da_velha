import * as readline from 'readline'
import { Board } from '../board';
import { Cpu } from '../cpu';
import { GameStatusChecker } from '../gameStatusChecker';
import { BoardPrinter } from '../boardPrinter';
import IBoard from '@src/interfaces/iBoard';
import IGameStatusChecker from '@src/interfaces/iGameStatusChecker';
import IBoardPrinter from '@src/interfaces/iBoardPrinter';
import IScoreboard from '@src/interfaces/iScoreboard';
import { GameResult, Scoreboard } from '../scoreboard';

class Main {
    private rl;
    private game: IBoard;
    private isCpuTimeToPlay: boolean;
    private gameStatusChecker: IGameStatusChecker;
    private boardPrinter: IBoardPrinter;
    private scoreboard: IScoreboard;

    constructor(
        game: IBoard, 
        gameStatusChecker: IGameStatusChecker, 
        boardPrinter: IBoardPrinter,
        scoreboard: IScoreboard,
    ) {
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
    private showInstructions() {
        console.log("Seja bem-vindo ao Jogo da Velha!!!")
        console.log("Para jogar, digite um número de 1 a 9 para inserir sua marcação =)")
    } 

    private validateMove(move: number):void {
        if(!this.game.isMoveValid(move - 1)) {
            throw new Error("Erro: Movimento inválido. A casa selecionada já está ocupada.");
        }
        this.game.assignMove(move, true);
        this.isCpuTimeToPlay = !this.isCpuTimeToPlay;
    }
    
    private validateInput(input: string):number {
        const inputNormalize = parseInt(input);
        if(isNaN(inputNormalize) || inputNormalize < 1 || inputNormalize > 9) {
        
            throw new Error("Erro: entrada inválida. A entrada precisa ser um número disponível entre 1 e 9. Tente novamente.");
        } 
        return inputNormalize;
    }
    public continueGame() {
        this.rl.question("Aperte (1) para continuar jogando ou (0) para encerrar", (input) => {
            if(input === "1") {
                this.resetGame();
            } else if(input === "0") {
                this.rl.close();
            } else {
                console.error("Entrada incorreta, tente novamente");
                this.continueGame();
            }
            
        })
    }
    private resetGame() {
        this.game.reset();
        this.promptUser();
    }

    private handleWin(): void {
        const [result, message] = this.gameStatusChecker.giveMessageWinner();
        console.log(message);
        this.boardPrinter.printTable();
        this.scoreboard.incrementValue(result);
        this.scoreboard.printScoreboard();
        this.continueGame();
    }
    private handleDraw() {
        console.log("O jogo empatou!")
        this.scoreboard.incrementValue(GameResult.DRAW);
        this.scoreboard.printScoreboard();
        this.continueGame();
    }
    public build():void {
        this.showInstructions();
        this.promptUser();
    }
    private promptUser():void {
        try {
            if(this.gameStatusChecker.checkIsWin()) {
                this.handleWin();
                return
            }
            if(this.gameStatusChecker.checkIsDraw()) {
                this.handleDraw();
                return
            }    
            console.log(this.isCpuTimeToPlay ? "É a vez do CPU:" : "Sua vez:")
            if(!this.isCpuTimeToPlay) {
                this.boardPrinter.printTable();
            } 
    
            try {
                const cpuPlay = new Cpu().genarateNumberPlay(this.game.getTable());
                if(this.isCpuTimeToPlay) {
                    this.game.assignMove(cpuPlay, false);
                    console.log("O CPU escolhe a casa: ", cpuPlay);
                    this.isCpuTimeToPlay = !this.isCpuTimeToPlay
                    this.promptUser(); 
                    return
                }
            } catch (err) {
                if(err instanceof Error) {
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
                } catch (err) {
                    if(err instanceof Error) {
                        console.error(err.message);
                    }
                    else {
                        console.error("Ocorreu um erro desconhecido.");
                    }
                } 

                this.promptUser();
            });
        } catch (err) {
            console.error("Ocorreu um erro inesperado:", err);
            this.rl.close();
        }
       
    }

}
const board = new Board(); 
const printer = new BoardPrinter(board);
const checker = new GameStatusChecker(board);
const scoreboard = new Scoreboard();
new Main(board, checker, printer, scoreboard).build();