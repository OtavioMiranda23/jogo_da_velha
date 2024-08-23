export default interface IMediumLevel {
    isCenterMoveFree(board: string[]): boolean;
    assinalateMove(avaliblePlays: string[]): number;
    isNextMoveWin(board: string[]): number[][];
}