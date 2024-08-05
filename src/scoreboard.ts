import IScoreboard from "./interfaces/iScoreboard";

export type TypeScoreboard = {
    player: number, 
    cpu: number,
    draw: number
}

export enum GameResult {
    CPU = "cpu",
    PLAYER = "player",
    DRAW = "draw",
}

export class Scoreboard implements IScoreboard {
    private scoreboard: TypeScoreboard;
    
    constructor() {
        this.scoreboard = {
            cpu: 0,
            player: 0,
            draw: 0
        }
    }
    public printScoreboard(): void {
        console.log("O placar está:");
        console.log(`Você: ${this.scoreboard.player}`);
        console.log(`CPU: ${this.scoreboard.cpu}`);
        console.log(`Empate: ${this.scoreboard.draw}`);
    }
    public incrementValue(result: GameResult): void {
        this.scoreboard[result]++;
    }
}