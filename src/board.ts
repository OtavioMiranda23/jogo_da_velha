import IBoard from "./interfaces/iBoard";

export class Board implements IBoard {
    private table: string[]; 
    constructor() {
        this.table = ["1","2","3","4","5","6","7","8","9"]
    }

    private setTable(position: number, value: string):void {
        this.table[position] = value;
    }

    public getTable() {
        return this.table;
    } 

    public assignMove(tableAssign: number, isPlayer:boolean):void {
        const tableAssignNomrmalize = tableAssign - 1;
        //TODO: Verifica se o movimento é do player ou cpu e assinala se for válido
        if(!this.isMoveValid(tableAssignNomrmalize)) {
            throw new Error("Movimento inválido: Casa selecionada já está ocupada");
        }
        isPlayer ? this.setTable(tableAssignNomrmalize, "X") : this.setTable(tableAssignNomrmalize, "O");  
    }

    public isMoveValid(tableAssign: number):boolean {
        //TODO: Se o target estiver disponível no tabuleiro, retorna true
        if(tableAssign < 0 || tableAssign > 8) {
    
    
            throw new Error("Movimento inválido: a casa selecionada deve ser um número entre 1 e 9");
        }
        const cell = this.getTable()[tableAssign];
        return cell !== "X" && cell !== "O";
    }
}