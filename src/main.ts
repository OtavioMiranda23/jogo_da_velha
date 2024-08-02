import * as readline from 'readline'
import { Board } from './board';
import { Cpu } from './cpu';
import { GameStatusChecker } from './gameStatusChecker';
import { BoardPrinter } from './boardPrinter';

class Main {
    private rl;
    private game: Board;
    private isCpuTimeToPlay: boolean;
    private gameStatusChecker: GameStatusChecker;
    private boardPrinter: BoardPrinter;

    constructor(game: Board, gameStatusChecker: GameStatusChecker, boardPrinter: BoardPrinter) {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        this.game = game;
        this.gameStatusChecker = gameStatusChecker;
        this.isCpuTimeToPlay = false;
        this.boardPrinter = boardPrinter;
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
    public  build():void {
        this.showInstructions();
        this.promptUser();
    }
    private promptUser():void {
        try {
            if(this.gameStatusChecker.checkIsWin()) {
                console.log("Vitória");
                console.log(this.gameStatusChecker.giveMessageWinner());
                this.boardPrinter.printTable();
                this.rl.close();
                return
            }
            if(this.gameStatusChecker.checkIsDraw()) {
                console.log("Empate!")
                this.rl.close();
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
                    this.promptUser();  // Chama a si mesma recursivamente após o processamento da jogada do usuário
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

                this.promptUser();  // Chama a si mesma recursivamente após o processamento da jogada do usuário
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
new Main(board, checker, printer).build();