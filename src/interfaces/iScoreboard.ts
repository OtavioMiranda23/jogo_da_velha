import { GameResult, TypeScoreboard } from "@src/controller/scoreboard";

export default interface IScoreboard {
    incrementValue(result: GameResult): void;
    printScoreboard(): void;
}