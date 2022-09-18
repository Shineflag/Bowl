import { AudioManager } from "./AudioManager";
import { GameManager } from "./GameManager";
import { UIManager } from "./UIManager";



export class Global{
    static gameManager: GameManager 
    static uiManager: UIManager
    static audioManager: AudioManager

    static setGameManager(gm: GameManager){
        this.gameManager = gm 
    }

    static setUIManager(um: UIManager){
        console.log("setUIManager", um)
        this.uiManager = um 
    }

    static setAudioManager(am: AudioManager) {
        this.audioManager = am 
    }
}