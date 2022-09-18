import { _decorator, Component, Node,Prefab, SpriteFrame, Layout, Label, Sprite, Button, UITransform, instantiate } from 'cc';
import { FoodPrefab } from './FoodPrefab';
const { ccclass, property } = _decorator;

@ccclass('LevelItem')
export class LevelItem extends Component {

    @property(Prefab)
    foodsPrefab: Prefab

    @property(Node)
    foods: Node 

    @property(Label)
    level: Label 

    @property(Label)
    lock: Label

    private _callBack: Function

    start() {

    }

    update(deltaTime: number) {
        
    }

    //设置 关卡数字
    setData(lv: number, foods: number[]) {
        this.level.string = lv.toString()
       
        this.setLock(true)
        foods.forEach( item => {
            let node = this.creatFood(item)
            this.foods.addChild(node)
            // console.log("foods", lv,  this.foods.children.length, node)
        })
        
    }

    setLock(lock: boolean){
        if(lock){
            this.lock.string = "未解锁"
            this.getComponent(Button).enabled = false
        } else {
            this.lock.string = "已解锁"
            this.getComponent(Button).enabled = true
        }
    }

    creatFood(index:number) : Node{
        let node =  instantiate(this.foodsPrefab)
        node.getComponent(FoodPrefab).setFrame(index)
        return node
    }

    click() {
        this._callBack && this._callBack(parseInt(this.level.string))
    }

    setCallBack(func:Function){
        this._callBack = func
    }

}

