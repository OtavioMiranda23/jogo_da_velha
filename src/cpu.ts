export class Cpu {
    public genarateNumberPlay(avaliblePlays: string[]):number {
        const avaliblePlaysFiltered:string[] = avaliblePlays.filter(values => values !== "X" && values !== "O");
        if(!avaliblePlaysFiltered.length) {
            throw new Error("Não há mais jogadas disponíveis.")
        }
        return parseInt(avaliblePlaysFiltered[this.getRandomInt(avaliblePlaysFiltered.length)])
    }

    private getRandomInt(max: number) {
        return Math.floor(Math.random() * max)
    }

}