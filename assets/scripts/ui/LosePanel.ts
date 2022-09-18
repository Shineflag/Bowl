import { _decorator, Component, Node } from 'cc';
import { Global } from '../Global';
const { ccclass, property } = _decorator;

@ccclass('LosePanel')
export class LosePanel extends Component {
    start() {

    }

    update(deltaTime: number) {
        
    }

    onReStart() {
        Global.audioManager.playClick()
        Global.uiManager.toGamePanel()
        Global.gameManager.reStart()
        this.node.active = false
    }

    onBackStartMenu() {
        Global.audioManager.playClick()
        Global.uiManager.toStartMenu()
    }
}

