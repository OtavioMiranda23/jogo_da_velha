import { GameResult } from "@src/scoreboard";

export default interface IGameStatusChecker {
    checkIsWin():boolean;
    giveMessageWinner():[GameResult, string];
    checkIsDraw():boolean;
    checkIsEmptyAssigns():boolean
}