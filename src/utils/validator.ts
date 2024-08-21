export default class Validator {
    public static validateInput(input: string): number {
        const inputNormalize = parseInt(input);
        if(isNaN(inputNormalize) || inputNormalize < 1 || inputNormalize > 9) {
        
            throw new Error("Erro: entrada inválida. A entrada precisa ser um número disponível entre 1 e 9. Tente novamente.");
        } 
        return inputNormalize;
    }
}