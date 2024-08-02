import { Cpu } from "../src/cpu";

describe('Cpu class tests', () => {
    let cpu: Cpu;

    beforeEach(() => {
        cpu = new Cpu();
    });

    test('should generate a valid play number from available plays', () => {
        const availablePlays = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
        const play = cpu.genarateNumberPlay(availablePlays);
        expect(play).toBeGreaterThanOrEqual(1);
        expect(play).toBeLessThanOrEqual(9);
    });

    test('should filter out "X" and "O" from available plays', () => {
        const availablePlays = ["1", "X", "3", "O", "5"];
        const play = cpu.genarateNumberPlay(availablePlays);
        expect([1, 3, 5]).toContain(play);
    });

    test('should throw an error when no plays are available', () => {
        const availablePlays = ["X", "O", "X", "O", "X", "O", "X", "O", "X"];
        expect(() => cpu.genarateNumberPlay(availablePlays)).toThrow("Não há mais jogadas disponíveis.");
    });

});
