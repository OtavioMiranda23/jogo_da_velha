import ICpu from "../interfaces/iCpu";
import { Board } from "./board";
import CpuEasyLevel from "./cpuEasyLevel";
import CpuMediumLevel from "./CpuMediumLevel";

enum DifficultyLevel {
    EASY = 1,
    MEDIUM = 2,
    HARD = 3
}

export class Cpu implements ICpu {
    private difficultyLevel: DifficultyLevel;
    private cpuEasyLevel: CpuEasyLevel;
    private cpuMediumLevel: CpuMediumLevel;
   
    constructor(difficulty: DifficultyLevel, easy: CpuEasyLevel, medium: CpuMediumLevel) {
        this.difficultyLevel = difficulty;
        this.cpuEasyLevel = easy;
        this.cpuMediumLevel = medium;
    }

  
    public selectDifficulty(avaliblePlays: string[]): void {
        switch (this.difficultyLevel) {
            case DifficultyLevel.EASY:
                this.cpuEasyLevel.giveRandomPlay(avaliblePlays);     
                break;
            case DifficultyLevel.MEDIUM:
                this.cpuMediumLevel.assinalateMove(avaliblePlays)
        
            default:
                break;
        }
    }
}