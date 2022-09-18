import { _decorator, Component, Node, AudioClip, AudioSource } from 'cc';
import { Global } from './Global';
const { ccclass, property } = _decorator;

@ccclass('AudioManager')
export class AudioManager extends Component {




    @property(AudioSource)
    play: AudioSource

    @property(AudioClip)
    click: AudioClip 

    @property(AudioClip)
    win: AudioClip 


    @property(AudioClip)
    lose: AudioClip 

    start() {
        Global.setAudioManager(this)
    }

    update(deltaTime: number) {
        
    }

    playClick() {
        this.play.playOneShot(this.click)
    }

    playWin() {
        this.play.playOneShot(this.win)
    }

    playLose() {
        this.play.playOneShot(this.lose)
    }
}

