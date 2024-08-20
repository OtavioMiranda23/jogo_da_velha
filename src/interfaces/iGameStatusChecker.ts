import { GameResult } from "@src/controller/scoreboard";

export default interface IGameStatusChecker {
    checkIsWin():boolean;
    giveMessageWinner():[GameResult, string];
    checkIsDraw():boolean;
    checkIsEmptyAssigns():boolean
}