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

    public verifyRowFree(avaliblePlays: string[]): number {
        const patternsRowWin =  [
            ['1', '2', '3'], 
            ['4', '5', '6'], 
            ['7', '8', '9']
        ];
        //avaliblePlays.forEach()
        return 9

    }
}