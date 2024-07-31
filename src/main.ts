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
    public  build():void {
        this.promptUser();
    }
    public promptUser():void {
        console.log(this.isCpuTimeToPlay ? "É a vez do CPU:" : "Sua vez:")
        this.game.printTable();
        if(this.game.checkIsWin()) {
            console.log("Vitória");
            this.rl.close();
            return
        }
        if(this.game.checkIsDraw()) {
            console.log("Empate!")
            this.rl.close();
            return
        }
        
        const cpuPlay = new Cpu().genarateNumberPlay(this.game.getTable());
        if(cpuPlay === null) {
            console.error("Todas as jogadas já foram feitas.");
            return;
        }
        if(this.isCpuTimeToPlay) {
            this.game.assignMove(cpuPlay, false);
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