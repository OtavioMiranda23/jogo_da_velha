export default class CpuRandom {
    public static getRandomInt(max: number): number {
        return Math.floor(Math.random() * max)
    }
}