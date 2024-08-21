export default interface IMediumLevel {
    isCenterMoveFree(board: string[]): boolean;
    assinalateMove(avaliblePlays: string[]): number;
    verifyRowFree(avaliblePlays: string[]): number;
}