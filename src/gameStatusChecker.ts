import { Board } from "./board";

export class GameStatusChecker {
    private board: Board

    constructor(board: Board) {
        this.board = board;
    }

    public checkIsWin():boolean {
        //TODO: Se a combinação se encaixar nos casos de vitória, retorna true
        const table = this.board.getTable();
        const winCases = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // linhas
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // colunas
            [0, 4, 8], [2, 4, 6]             // diagonal
        ];
        return winCases.some((pattern:number[]) => {
             const [a, b, c] = pattern;
             return table[a] === table[b] && table[b] === table[c]; 
        })
    }
    public giveMessageWinner():string | null {
        const table = this.board.getTable();

        const winCases = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // linhas
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // colunas
            [0, 4, 8], [2, 4, 6]             // diagonal
        ];
        const winPattern =  winCases.filter((pattern: number[]) => {
            const [a, b, c] = pattern;
            return table[a] === table[b] && table[b] === table[c];
        })
        const winValues = [
            table[winPattern[0][0]],
            table[winPattern[0][1]],
            table[winPattern[0][2]],
        ];
        if(winValues.every(item => item === "X")) {
            return "Você venceu! Parabéns"
        }   
        else if(winValues.every(item => item === "O")) {
            return "O CPU venceu =("
        }
        else {
            throw new Error("Erro ao definir vencedor.")
        }
    }
    public checkIsDraw():boolean {
        //TODO: Se as jogadas se esgotarem e não houver vencedor, retorna true
        return !this.checkIsEmptyAssigns() && !this.checkIsWin();
    }

    public checkIsEmptyAssigns():boolean {
        const table = this.board.getTable();
        return table.some(cell => cell !== "X" && cell != "O");
    }
}