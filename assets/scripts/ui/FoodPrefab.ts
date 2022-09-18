import { _decorator, Component, Node, SpriteFrame, Sprite, UITransform } from 'cc';
const { ccclass, property } = _decorator;

const W = 40 

@ccclass('FoodPrefab')
export class FoodPrefab extends Component {

    @property([SpriteFrame])
    frames: SpriteFrame[] = []

    @property(Node)
    food: Node

    start() {

    }

    update(deltaTime: number) {
        
    }

    setFrame(index) {
        this.food.getComponent(Sprite).spriteFrame = this.frames[index]
        let w = this.food.getComponent(UITransform).width
        let scale = W/w  

        this.food.setScale(scale, scale)
    }
}

