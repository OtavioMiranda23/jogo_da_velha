import { Board } from "./board";

export class BoardPrinter {
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