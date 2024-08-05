import { Board } from "./board";
import IBoardPrinter from "./interfaces/iBoardPrinter";

export class BoardPrinter implements IBoardPrinter {
    private board: Board;

    constructor(board: Board) {
        this.board = board;
    }

    private colorize(symbol: string): string {
        if (symbol === 'X') {
            return `\x1b[34m${symbol}\x1b[0m`; // Azul
        } else if (symbol === 'O') {
            return `\x1b[31m${symbol}\x1b[0m`; // Vermelho
        } else {
            return symbol; // Nenhuma cor
        }
    }

    public printTable(): void {
        const table = this.board.getTable();
        console.log(" " + this.colorize(table[0]) + " | " + this.colorize(table[1]) + " | " + this.colorize(table[2]) + " ");
        console.log("---+---+---");
        console.log(" " + this.colorize(table[3]) + " | " + this.colorize(table[4]) + " | " + this.colorize(table[5]) + " ");
        console.log("---+---+---");
        console.log(" " + this.colorize(table[6]) + " | " + this.colorize(table[7]) + " | " + this.colorize(table[8]) + " ");
    }
}
