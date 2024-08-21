"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
class Board {
    constructor() {
        this.table = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    }
    setTable(position, value) {
        this.table[position] = value;
    }
    getTable() {
        return this.table;
    }
    assignMove(tableAssign, isPlayer) {
        const tableAssignNomrmalize = tableAssign - 1;
        if (!this.isMoveValid(tableAssignNomrmalize)) {
            throw new Error("Movimento inválido: Casa selecionada já está ocupada");
        }
        isPlayer ? this.setTable(tableAssignNomrmalize, "X") : this.setTable(tableAssignNomrmalize, "O");
    }
    isMoveValid(tableAssign) {
        if (tableAssign < 0 || tableAssign > 8) {
            throw new Error("Movimento inválido: a casa selecionada deve ser um número entre 1 e 9");
        }
        const cell = this.getTable()[tableAssign];
        return cell !== "X" && cell !== "O";
    }
    reset() {
        this.table = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    }
}
exports.Board = Board;
