import * as readline from 'readline'
import { Board } from './board';

class Main {
    private rl;
    private game: Board;
    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.game = new Board();
    }
    public  build():void {
        this.promptUser();
    }
    public promptUser():void {
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

        this.rl.question("Qual a sua jogada? (1-9) ", (play) => {
            const playNormalize = parseInt(play);
            
            if (isNaN(playNormalize) || playNormalize < 1 || playNormalize > 9) {
                console.log("Entrada inválida. Tente novamente.");
            } else if (!this.game.isMoveValid(playNormalize - 1)) {
                console.log("Movimento inválido: Casa selecionada já está ocupada");
            } else {
                this.game.assignMove(playNormalize, true);
            }

            this.promptUser();  // Chama a si mesma recursivamente após o processamento da jogada do usuário
        });
    }
}
new Main().build();