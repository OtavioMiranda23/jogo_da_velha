export default interface IBoard {
    getTable(): string[];
    assignMove(tableAssign: number, isPlayer: boolean): void;
    isMoveValid(tableAssign: number): boolean;
    reset(): void;
}