import ICpuEasy from "@src/interfaces/iCpuEasy";
import CpuRandom from "./cpuRandom";

export default class CpuEasyLevel implements ICpuEasy {
    public giveRandomPlay(avaliblePlays: string[]): number {
        const avaliblePlaysFiltered:string[] = avaliblePlays.filter(values => values !== "X" && values !== "O");
        if(!avaliblePlaysFiltered.length) {
            throw new Error("Não há mais jogadas disponíveis.")
        }
        const randomicPlay: number = CpuRandom.getRandomInt(avaliblePlaysFiltered.length);
        return parseInt(avaliblePlaysFiltered[randomicPlay]);
    }
}