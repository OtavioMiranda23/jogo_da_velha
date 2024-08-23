import IMediumLevel from "../interfaces/iMediumDifficulty";
import CpuRandom from "./cpuRandom";

export default class CpuMediumLevel implements IMediumLevel {

    public isCenterMoveFree(board: string[]): boolean {
        return board.includes("5");
    }
    public assinalateMove(avaliblePlays: string[]): number {
        const fiveIndex = avaliblePlays.indexOf("5");
        const randomPlay = CpuRandom.getRandomInt(avaliblePlays.length);
        return this.isCenterMoveFree(avaliblePlays) ? fiveIndex : randomPlay; 
    }

    public isNextMoveWin(board: string[]): number[][] {
        const winCases = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // linhas
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // colunas
            [0, 4, 8], [2, 4, 6]             // diagonal
        ];
    const patternCandidate = winCases.filter(pattern => {
            const [a, b, c] = pattern;

            const firstCase = board[a] === "O" && 
                board[a] === board[b] && 
                board[c] !== "O" && board[c] !== "X";

            const secondCase = board[a] === "O" && 
                board[a] === board[c] && 
                board[b] !== "O" && board[b] !== "X";

            const thirdCase =  board[b] === "O" &&
                board[b] === "O" && 
                board[b] == board[c] && 
                board[a] !== "O" && board[a] !== "X";

            return firstCase || secondCase || thirdCase;
        })
        
        return patternCandidate;
    }
    
}