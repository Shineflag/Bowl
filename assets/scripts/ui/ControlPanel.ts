import { _decorator, Component, Node, EventTouch, Vec2, Vec3, math } from 'cc';
import { Global } from '../Global';
const { ccclass, property } = _decorator;

@ccclass('ControlPanel')
export class ControlPanel extends Component {

    private _R:number = 130 

    @property(Node)
    panel: Node 
    @property(Node)
    joystick: Node

    @property(Node)
    left: Node
    @property(Node)
    right: Node


    private _touchPos: Vec2 = new Vec2()
    private _localPos: Vec3 = new Vec3()
    private _worldPos: Vec3 = new Vec3()

    private _leftPress: boolean = false
    private _rightPress: boolean = false


    start() {
        const {TOUCH_START, TOUCH_MOVE, TOUCH_CANCEL, TOUCH_END} = Node.EventType
        this.panel.on(TOUCH_START, this._onPanelTouchStart, this)
        this.panel.on(TOUCH_MOVE, this._onPanelTouchMove, this)
        this.panel.on(TOUCH_CANCEL, this._onPanelTouchCancel, this)
        this.panel.on(TOUCH_END, this._onPanelTouchEnd, this)

        this.left.on(TOUCH_START, this._onLeftTouchStart, this)
        this.left.on(TOUCH_CANCEL, this._onLeftTouchEnd, this)
        this.left.on(TOUCH_END, this._onLeftTouchEnd, this)

        this.right.on(TOUCH_START, this._onRightTouchStart, this)
        this.right.on(TOUCH_CANCEL, this._onRightTouchEnd, this)
        this.right.on(TOUCH_END, this._onRightTouchEnd, this)

    }

    update(dt: number) {
        if(this._leftPress){
            Global.gameManager.onLeftFood(dt)
        }

        if(this._rightPress){
            Global.gameManager.onRightFood(dt)
        }
        
    }

    downClick() {
        console.log("downClick")
        Global.audioManager.playClick()
        Global.gameManager.onDownFood()
    }

    private _onPanelTouchStart(event: EventTouch) {
        event.getUILocation(this._touchPos)
        this._changeJoyStickPos(this._touchPos)
    }

    private _onPanelTouchMove(event: EventTouch) {
        event.getUILocation(this._touchPos)
        this._changeJoyStickPos(this._touchPos)
    }

    
    private _onPanelTouchCancel(event: EventTouch) {
        console.log("_onPanelTouchCancel")
        this.joystick.setPosition(0 , 0)
    }
    private _onPanelTouchEnd(event: EventTouch) {
        console.log("_onPanelTouchEnd")
        this.joystick.setPosition(0 , 0)
    }

    _changeJoyStickPos( pos: Vec2){
        this._worldPos.x = pos.x 
        this._worldPos.y = pos.y 
        this.panel.inverseTransformPoint(this._localPos, this._worldPos)
        const len = this._localPos.length()
        if( len > this._R){
            this._localPos.multiplyScalar(this._R/len)
        }
        this.joystick.setPosition(this._localPos.x, this._localPos.y)
        

        let angle =  math.toDegree(Math.atan2(this._localPos.y, this._localPos.x))
        
        Global.gameManager.onRotateFood (angle)
    }


    private _onLeftTouchStart(event: EventTouch) {
        Global.audioManager.playClick()
        this._leftPress = true
        this.left.setScale(1.2,1.2,1)
    }

    private _onLeftTouchEnd(event: EventTouch) {
        this._leftPress = false
        this.left.setScale(1,1,1)
    }

    private _onRightTouchStart(event: EventTouch) {
        Global.audioManager.playClick()
        this._rightPress = true
        this.right.setScale(1.2,1.2,1)
    }

    private _onRightTouchEnd(event: EventTouch) {
        this._rightPress = false
        this.right.setScale(1,1,1)
    }
}

