import Global from "../global/Global";
import {GamePatten} from "../game/GameBaseAbstract";

const {ccclass, property} = cc._decorator;
@ccclass
export default class Launch extends cc.Component{
    @property({
        type : cc.Label,
        default : null
    })
    private bestScore : cc.Label;
    private onPlayNewGame = false;
    public onLoad(){
        this.bestScore.string = Global.getBestScore();
    }
    public quit() : void{
        cc.game.end();
    }
    public playNative(){
        this.runGameScene(GamePatten.NATIVE, "Game");
    }
    public playPVP(){
        this.runGameScene(GamePatten.PVP, "Connect");
    }
    private runGameScene(gamePatten : GamePatten, sceneName : string){
        if(this.onPlayNewGame) return;
        this.onPlayNewGame = true;
        cc.game.pause();
        cc.director.pause();
        Global.setGamePatten(gamePatten);
        cc.director.loadScene(sceneName,() =>{
            cc.game.resume();
            cc.director.resume();
            this.onPlayNewGame = false;
        });
    }
}