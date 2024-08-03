import { Board } from "./board";
import IBoardPrinter from "./interfaces/iBoardPrinter";

export class BoardPrinter implements IBoardPrinter {
    private board: Board;

    constructor(board: Board) {
        this.board = board;
    }
    public printTable(): void {
        const table = this.board.getTable();
        console.log(" " + table[0] + " | " + table[1] + " | " + table[2] + " ");
        console.log("---+---+---");
        console.log(" " + table[3] + " | " + table[4] + " | " + table[5] + " ");
        console.log("---+---+---");
        console.log(" " + table[6] + " | " + table[7] + " | " + table[8] + " ");
    }
} 