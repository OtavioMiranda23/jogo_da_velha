"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MediumDifficulty {
    isCenterMoveFree(board) {
        return board.includes("5");
    }
    assinalateMove(isCenterMoveFree) {
        //todo: retornar numero 5 ou index da casa central?
        return isCenterMoveFree ? "5" :
        ; //numero aleatorio
    }
}
exports.default = MediumDifficulty;
