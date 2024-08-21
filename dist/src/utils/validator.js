"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Validator {
    static validateInput(input) {
        const inputNormalize = parseInt(input);
        if (isNaN(inputNormalize) || inputNormalize < 1 || inputNormalize > 9) {
            throw new Error("Erro: entrada inválida. A entrada precisa ser um número disponível entre 1 e 9. Tente novamente.");
        }
        return inputNormalize;
    }
}
exports.default = Validator;
