import { _decorator, Component, Node, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LevelInfo')
export class LevelInfo extends Component {

    @property(Label)
    level: Label

    @property(Label)
    food: Label

    start() {

    }

    update(deltaTime: number) {
        
    }

    setLevel(level: number) {
        this.level.string = `第 ${level} 关`
    }

    setProgress(count:number, total: number) {
        this.food.string = `${count} / ${total}`
    }

}

