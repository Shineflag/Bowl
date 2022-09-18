import { _decorator, Component, Node, tween } from 'cc';
import { Global } from '../Global';
import { LocalStorage } from '../utils/LocalStorage';
const { ccclass, property } = _decorator;

@ccclass('StartMenu')
export class StartMenu extends Component {

    start() {

    }

    update(deltaTime: number) {
        
    }

    startClick() {
        Global.audioManager.playClick()
        let unlock = LocalStorage.getUnLockLevel()
        Global.uiManager.gameStart(unlock)
    }

    selectClick() {
        Global.audioManager.playClick()
        Global.uiManager.toLevelSelect()
    }


}

