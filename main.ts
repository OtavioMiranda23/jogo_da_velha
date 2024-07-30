import * as readline from 'readline'
import { Board } from './board';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const jogo = new Board();

rl.question("Qual a sua jogada?", (play) => {
    jogo.assignMove(parseInt(play), true);
    jogo.printTable()
    rl.close();
})
