import * as readline from 'readline'
import { Board } from './board';
import { Cpu } from './cpu';

class Main {
    private rl;
    private game: Board;
    private isCpuTimeToPlay: boolean;
    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.game = new Board();
        this.isCpuTimeToPlay = false;
    }
    public showInstructions() {
        console.log("Seja bem-vindo ao Jogo da Velha!!!")
        console.log("Para jogar, digite um número de 1 a 9 para inserir sua marcação =)")
    }
    public  build():void {
        this.showInstructions();
        this.promptUser();
    }
    public promptUser():void {
        if(this.game.checkIsWin()) {
            console.log("Vitória");
            console.log(this.game.giveMessageWinner());
            this.game.printTable();
            this.rl.close();
            return
        }
        if(this.game.checkIsDraw()) {
            console.log("Empate!")
            this.rl.close();
            return
        }

        console.log(this.isCpuTimeToPlay ? "É a vez do CPU:" : "Sua vez:")
        if(!this.isCpuTimeToPlay) {
            this.game.printTable();
        } 

        const cpuPlay = new Cpu().genarateNumberPlay(this.game.getTable());
        if(cpuPlay === null) {
            console.error("Todas as jogadas já foram feitas.");
            return;
        }
        if(this.isCpuTimeToPlay) {
            this.game.assignMove(cpuPlay, false);
            console.log("O CPU escolhe a casa: ", cpuPlay);
            this.isCpuTimeToPlay = !this.isCpuTimeToPlay
            this.promptUser();  // Chama a si mesma recursivamente após o processamento da jogada do usuário
            return
        }

        this.rl.question("Qual a sua jogada? (1-9) ", (play) => {
            const playNormalize = parseInt(play);
            
            if (isNaN(playNormalize) || playNormalize < 1 || playNormalize > 9) {
                console.log("Entrada inválida. Tente novamente.");
            } else if (!this.game.isMoveValid(playNormalize - 1)) {
                console.log("Movimento inválido: Casa selecionada já está ocupada");
            } else {
                this.game.assignMove(playNormalize, true);

                this.isCpuTimeToPlay = !this.isCpuTimeToPlay
            }

            this.promptUser();  // Chama a si mesma recursivamente após o processamento da jogada do usuário
        });
    }
}
new Main().build();