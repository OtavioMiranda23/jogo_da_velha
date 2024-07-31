export class Board {
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
            console.error("Movimento inválido: Casa selecionada já está ocupada")
        }
        isPlayer ? this.setTable(tableAssignNomrmalize, "X") : this.setTable(tableAssignNomrmalize, "O");  
    }

    public isMoveValid(tableAssign: number):boolean {
        //TODO: Se o target estiver disponível no tabuleiro, retorna true
        if(tableAssign < 0 || tableAssign > 9) {
            console.error("Movimento inválido, a casa selecionada deve ser um número entre 1 e 9")
            return false;
        }
        const cell = this.table[tableAssign];
        return cell !== "X" && cell !== "O";
    }

    public checkIsWin():boolean {
        //TODO: Se a combinação se encaixar nos casos de vitória, retorna true
        const winCases = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // linhas
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // colunas
            [0, 4, 8], [2, 4, 6]             // diagonal
        ];
        return winCases.some((pattern:number[]) => {
             const [a, b, c] = pattern;
             return this.table[a] === this.table[b] && this.table[b] === this.table[c]; 
        })
    }

    public checkIsDraw():boolean {
        //TODO: Se as jogadas se esgotarem e não houver vencedor, retorna true
        return !this.checkIsEmptyAssigns() && !this.checkIsWin();
    }

    public checkIsEmptyAssigns():boolean {
        return this.table.some(cell => cell !== "X" && cell != "O");
    }

    public printTable(): void {
        console.log(" " + this.table[0] + " | " + this.table[1] + " | " + this.table[2] + " ");
        console.log("---+---+---");
        console.log(" " + this.table[3] + " | " + this.table[4] + " | " + this.table[5] + " ");
        console.log("---+---+---");
        console.log(" " + this.table[6] + " | " + this.table[7] + " | " + this.table[8] + " ");
    }

}