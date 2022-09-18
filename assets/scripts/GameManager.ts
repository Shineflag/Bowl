import { _decorator, Component, Node, sp, PhysicsSystem2D, EPhysics2DDrawFlags, RigidBody2D, ERigidBody2DType, Prefab, Vec3, instantiate, Vec2, UITransform, Label } from 'cc';
import GameConfig from './config/GameConfig';
import { Global } from './Global';
import { LocalStorage } from './utils/LocalStorage';
const { ccclass, property } = _decorator;

//左右移动食物的速度
const speed = 100 

const CHECK_TIME = 1
let FALL_POS_Y = -800

function setPhysicsDynamic(node: Node) {
    let rigid = node.getComponent(RigidBody2D)
    rigid.type = ERigidBody2DType.Dynamic
}

function setPhysicsStatic(node: Node) {
    let rigid = node.getComponent(RigidBody2D)
    rigid.type = ERigidBody2DType.Static
}

interface IPlayInfo  {
    level: number,
    count: number,
    node: Node,
}

@ccclass('GameManager')
export class GameManager extends Component {

    @property([Prefab])
    foodPrefabs: Prefab[] = []

    @property(Node)
    foods: Node

    @property(Node)
    bowl: Node

    @property(Label) 
    countDown: Label

    private _playInfo: IPlayInfo = {
        level:0,
        count:0,
        node:null,
    }

    private _checkTime = 0 
    private _isPlaying = false

    onLoad() {
        console.log("GameManager.onLoad")
        Global.setGameManager(this)
        FALL_POS_Y = this.bowl.position.y - this.bowl.getComponent(UITransform).height/2 - 10
    }

    start() {

        // PhysicsSystem2D.instance.enable = true
        // PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.All
        console.log(GameConfig)
        this.gameReset()
    }

    update(dt: number) {
        if(!this._isPlaying)return 

        this._checkTime += dt 
        if(this._checkTime > CHECK_TIME) {
            console.log("有食物落下", this.someFoodFall)
            if(this.someFoodFall){
                this.gameOver(false)
            }
            this._checkTime = 0
        } 
    }


    gameStart(lv: number){
        console.log(`游戏开始, level:${lv}, 数据:${GameConfig[lv]}`)
        this.gameReset()

        if(lv > GameConfig.length - 1) {
            Global.uiManager.toLevelSelect()
            return 
        }


        this.bowl.active = true

        this._playInfo.level = lv 
        this._playInfo.count = 0 

        this.nextStep()

        this._isPlaying = true

    }

    gameReset() {
        this._isPlaying = false
        this._checkTime = 0 
        this.foods.removeAllChildren()
        this.bowl.active = false
        this.countDown.node.active = false
    }

    reStart() {
        this.gameStart(this._playInfo.level)
    }

    nextLevel() {
        this.gameStart(this._playInfo.level + 1)
    }


    //添加食物
    addFood(index: number) {
        const pos = new Vec3(0, 450, 0)
        const food = instantiate(this.foodPrefabs[index])
        this.foods.addChild(food)
        food.setPosition(pos)
        setPhysicsStatic(food)

        this._playInfo.count++

        this.updateLevelInfo()
        return food
    }

    nextStep() {
        if(this._playInfo.count >= this.foodTotal){
            console.log("最后一个食物, 启动倒计时")
            let count = 5
            this.countDown.string = count.toString()
            this.countDown.node.active = true
            this.schedule( () => {
                count--
                this.countDown.string = count.toString()
                if(count == 0) {                    
                    if(this._isPlaying) {
                        this.gameOver(true)
                    }
                }
            }, 1, count-1)
        } else {
            const {level, count} = this._playInfo
            this._playInfo.node =  this.addFood(GameConfig[level][count])
        }
    }

    gameOver(win: boolean) {
        this.unscheduleAllCallbacks()
        this._isPlaying = false 
        if(win){
            Global.audioManager.playWin()
            Global.uiManager.toWinPanel()

    
            let unlock = LocalStorage.getUnLockLevel()
            if( unlock < this._playInfo.level + 1 ){
                LocalStorage.setUnLockLevel(this._playInfo.level + 1)
            }

        } else {
            Global.audioManager.playLose()
            Global.uiManager.toLosePanel()
        }
    }

    //刷新关卡的文字信息
    updateLevelInfo(){
        const {level, count} = this._playInfo
        Global.uiManager.setLevelInfo(level, count, this.foodTotal )
    }

    //是否有食物掉落
    get someFoodFall(): boolean {
        return this.foods.children.some( node => {
            return node.position.y < FALL_POS_Y
        })
    }


    get foodTotal():number {
        return GameConfig[this._playInfo.level].length
    }

    onRotateFood(angle: number) {
        console.log("GameManager.onRotateFood", angle)
        let node = this._playInfo.node
        if(node){
            node.angle = angle - 90
        }
    }

    onLeftFood(dt: number) {
        let node = this._playInfo.node
        if(node){
            let detla = speed*dt
            let pos = node.position
            node.setPosition(pos.x - detla, pos.y, pos.z)
        }
    }

    onRightFood(dt: number) {
        let node = this._playInfo.node
        if(node){
            let detla = speed*dt
            let pos = node.position
            node.setPosition(pos.x + detla, pos.y, pos.z)
        }
    }

    onDownFood(){
        let node = this._playInfo.node
        if(node){
            setPhysicsDynamic(node)
            node.getComponent(RigidBody2D).linearVelocity = new Vec2(0,-10)
            this._playInfo.node = null 

            this.scheduleOnce(this.nextStep, 1)
        }


    }
}

