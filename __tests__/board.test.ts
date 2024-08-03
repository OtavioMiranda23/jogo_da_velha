import { Board } from "../src/board";
import { GameStatusChecker } from "../src/gameStatusChecker";
import { BoardPrinter } from "../src/boardPrinter";
import { GameResult } from "../src/scoreboard";

describe('testing Board class', () => {
    let board: Board;
    let checker: GameStatusChecker;
    
    beforeEach(() => {
        board = new Board();
        checker = new GameStatusChecker(board);
    });

    // Testes para o método assignMove
    test('assignMove method Player', () => {
        board.assignMove(1, true);
        expect(board.getTable()[0]).toBe("X");
    });

    test('assignMove method CPU', () => {
        board.assignMove(1, false);
        expect(board.getTable()[0]).toBe("O");
    });

    test('assignMove method invalid position (occupied)', () => {
        board.assignMove(1, true);
        expect(() => board.assignMove(1, false)).toThrow("Movimento inválido: Casa selecionada já está ocupada");
    });

    test('assignMove method sequential valid moves', () => {
        board.assignMove(1, true);
        board.assignMove(2, false);
        board.assignMove(3, true);
        expect(board.getTable()[0]).toBe("X");
        expect(board.getTable()[1]).toBe("O");
        expect(board.getTable()[2]).toBe("X");
    });

    test('assignMove method with same move twice by player', () => {
        board.assignMove(5, true);
        expect(() => board.assignMove(5, true)).toThrow("Movimento inválido: Casa selecionada já está ocupada");
    });

    test('assignMove method with same move twice by CPU', () => {
        board.assignMove(5, false);
        expect(() => board.assignMove(5, false)).toThrow("Movimento inválido: Casa selecionada já está ocupada");
    });

    test('assignMove method mixed valid moves', () => {
        board.assignMove(1, true);
        board.assignMove(5, false);
        board.assignMove(9, true);
        board.assignMove(3, false);
        board.assignMove(7, true);
        expect(board.getTable()[0]).toBe("X");
        expect(board.getTable()[4]).toBe("O");
        expect(board.getTable()[8]).toBe("X");
        expect(board.getTable()[2]).toBe("O");
        expect(board.getTable()[6]).toBe("X");
    });

    // Testes para o método isMoveValid
    test('isMoveValid method valid positions', () => {
        expect(board.isMoveValid(0)).toBe(true);
        expect(board.isMoveValid(4)).toBe(true);
        expect(board.isMoveValid(8)).toBe(true);
    });

    test('isMoveValid method invalid position (out of range)', () => {
        expect(() => board.isMoveValid(-1)).toThrow("Movimento inválido: a casa selecionada deve ser um número entre 1 e 9");
        expect(() => board.isMoveValid(9)).toThrow("Movimento inválido: a casa selecionada deve ser um número entre 1 e 9");
    });

    test('isMoveValid method invalid position (occupied)', () => {
        board.assignMove(1, true);
        expect(board.isMoveValid(0)).toBe(false);
    });

    // Testes para o método checkIsWin
    test('checkIsWin method no win', () => {
        expect(checker.checkIsWin()).toBe(false);
    });

    test('checkIsWin method win for player', () => {
        board.assignMove(1, true);
        board.assignMove(2, true);
        board.assignMove(3, true);
        expect(checker.checkIsWin()).toBe(true);
    });

    test('checkIsWin method win for CPU', () => {
        board.assignMove(1, false);
        board.assignMove(2, false);
        board.assignMove(3, false);
        expect(checker.checkIsWin()).toBe(true);
    });

    // Testes para o método giveMessageWinner
    test('giveMessageWinner method player wins', () => {
        board.assignMove(1, true);
        board.assignMove(2, true);
        board.assignMove(3, true);
        expect(checker.giveMessageWinner()).toStrictEqual([GameResult.PLAYER, "Você venceu! Parabéns"]);
    });

    test('giveMessageWinner method CPU wins', () => {
        board.assignMove(1, false);
        board.assignMove(2, false);
        board.assignMove(3, false);
        expect(checker.giveMessageWinner()).toStrictEqual([GameResult.CPU, "O CPU venceu =("]);
    });

    // Testes para o método checkIsDraw
    test('checkIsDraw method no draw', () => {
        expect(checker.checkIsDraw()).toBe(false);
    });

    test('checkIsDraw method draw', () => {
        board.assignMove(1, true);
        board.assignMove(2, false);
        board.assignMove(3, true);
        board.assignMove(4, false);
        board.assignMove(5, true);
        board.assignMove(6, false);
        board.assignMove(7, false);
        board.assignMove(8, true);
        board.assignMove(9, false);
        expect(checker.checkIsDraw()).toBe(true);
    });

    // Testes para o método checkIsEmptyAssigns
    test('checkIsEmptyAssigns method with empty cells', () => {
        expect(checker.checkIsEmptyAssigns()).toBe(true);
    });

    test('checkIsEmptyAssigns method with no empty cells', () => {
        board.assignMove(1, true);
        board.assignMove(2, false);
        board.assignMove(3, true);
        board.assignMove(4, false);
        board.assignMove(5, true);
        board.assignMove(6, false);
        board.assignMove(7, false);
        board.assignMove(8, true);
        board.assignMove(9, false);
        expect(checker.checkIsEmptyAssigns()).toBe(false);
    });
});
