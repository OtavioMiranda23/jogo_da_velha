export default interface IGameStatusChecker {
    checkIsWin():boolean;
    giveMessageWinner():string | null;
    checkIsDraw():boolean;
     checkIsEmptyAssigns():boolean
}