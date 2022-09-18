import { sys } from "cc";

const  {localStorage} = sys 

const  UNLOCK_LEVEL = "UNLOCK_LEVEL"


export class LocalStorage {
    static set(key: string, val: string){
        localStorage.setItem(key, val)
    }

    static get(k): string {
        return localStorage.getItem(k)
    }


    static getUnLockLevel(): number {
        let lv = this.get("UNLOCK_LEVEL")
        if(lv){
            return parseInt(lv)
        }
        return 1
    }

    static setUnLockLevel(lv: number) {
        this.set(UNLOCK_LEVEL, lv.toString())
    }
}