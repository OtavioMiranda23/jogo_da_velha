import { GameResult, TypeScoreboard } from "@src/scoreboard";

export default interface IScoreboard {
    incrementValue(result: GameResult): void;
    printScoreboard(): void;
}