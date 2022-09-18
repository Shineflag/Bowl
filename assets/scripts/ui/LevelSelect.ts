import { _decorator, Component, Node, Prefab, instantiate } from 'cc';
import GameConfig from '../config/GameConfig';
import { Global } from '../Global';
import { LocalStorage } from '../utils/LocalStorage';
import { LevelItem } from './LevelItem';
const { ccclass, property } = _decorator;

@ccclass('LevelSelect')
export class LevelSelect extends Component {

    @property(Node)
    items: Node

    @property(Prefab)
    item: Prefab

    onLoad() {
        this.initLevels()
    }

    onEnable(){
        this.freshItemLockInfo()
    }

    start() {

    }

    update(deltaTime: number) {
        
    }

    backClick() {
        Global.uiManager.toStartMenu()
    }

    initLevels(){
       for(let lv = 1; lv < GameConfig.length; lv++ ){
            let item = instantiate(this.item)
            let itemCtl = item.getComponent(LevelItem)
            itemCtl.setData(lv , GameConfig[lv])

            let callback = ( level ) =>  {
                Global.audioManager.playClick()
                Global.uiManager.gameStart(level)
            }

            itemCtl.setCallBack(callback)
            this.items.addChild(item)
       }
    }

    freshItemLockInfo() {

        let unlock = LocalStorage.getUnLockLevel()
        // console.log("freshItemLockInfo unlock children",unlock, this.items.children.length )
        if(unlock > this.items.children.length ) {
            unlock = this.items.children.length
        }

        for(let i = 0; i < unlock ; i++ ) {
            this.items.children[i].getComponent(LevelItem).setLock(false)
        }
    }
}

