import { _decorator, Component, Node, UI } from 'cc';
import { Global } from '../Global';
import { LocalStorage } from '../utils/LocalStorage';
const { ccclass, property } = _decorator;

@ccclass('WinPanel')
export class WinPanel extends Component {
    start() {

    }

    update(deltaTime: number) {
        
    }


    onNextLevel() {
        Global.audioManager.playClick()
        Global.uiManager.toGamePanel()
        Global.gameManager.nextLevel()
        this.node.active = false
    }

    onBackStartMenu() {
        Global.audioManager.playClick()
        Global.uiManager.toStartMenu()
    }
}

