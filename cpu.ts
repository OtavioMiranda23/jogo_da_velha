export class Cpu {
    public genarateNumberPlay(avaliblePlays: string[]):number | null {
        const avaliblePlaysFiltered:string[] = avaliblePlays.filter(values => values !== "X" && values !== "O");
        if(!avaliblePlaysFiltered.length) {
            console.error("Todas as jogadas já foram feitas.")
            return null
        }
        return parseInt(avaliblePlaysFiltered[this.getRandomInt(avaliblePlaysFiltered.length)])
    }

    private getRandomInt(max: number) {
        return Math.floor(Math.random() * max)
    }

}