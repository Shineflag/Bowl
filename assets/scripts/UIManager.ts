import { _decorator, Component, Node, Prefab } from 'cc';
import { Global } from './Global';
import { LevelInfo } from './ui/LevelInfo';
const { ccclass, property } = _decorator;

enum NodeName{
    Loading = 'loading',
    StartMenu = 'StartMenu',
    LevelSelect = 'LevelSelect',
    ControlPanel = 'ControlPanel',
    LevelInfo = 'LevelInfo',
    WinPanel = 'WinPanel',
    LosePanel = 'LosePanel',
}

@ccclass('UIManager')
export class UIManager extends Component {

    show(nodes: NodeName[]){
        this.node.children.forEach( item => {
            if(nodes.find( name => item.name == name)){
                item.active = true
            } else {
                item.active = false
            }
        })
    }

   
    start() {
        Global.setUIManager(this)
    }

    update(deltaTime: number) {
        
    }

    

    gameStart(lv: number = 1){
        console.log("gameStart", Global.gameManager)
        console.log("gameStart", this)
        this.toGamePanel()
        Global.gameManager.gameStart(lv)
    } 

    toGamePanel() {
        this.show([NodeName.ControlPanel, NodeName.LevelInfo])
    }

    toLevelSelect() {
        console.log("toLevelSelect")
        this.show([NodeName.LevelSelect])
    }

    toStartMenu() {
        Global.gameManager.gameReset()
        this.show([NodeName.StartMenu])
    }

    toWinPanel() {
        this.show([NodeName.WinPanel, NodeName.LevelInfo])
    }

    toLosePanel() {
        this.show([NodeName.LosePanel, NodeName.LevelInfo])
    }

    setLevelInfo(lv: number, count: number, total: number) {
        const infoNode = this.node.getChildByName(NodeName.LevelInfo)
        const comp = infoNode.getComponent(LevelInfo)
        comp.setLevel(lv)
        comp.setProgress(count, total)
    }



}

