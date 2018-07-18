import Global, {GameState} from "../global/Global";
import Config from "../global/Config";
const {ccclass, property} = cc._decorator;
@ccclass
export default class Launch extends cc.Component{
    @property({
        type : cc.Label,
        default : null
    })
    private timeLabel : cc.Label;
    public run(){
        this.node.active = true;
        let timeLabel = this.timeLabel;
        timeLabel.string = Config.gameSecond + "";
        let callback = () => {
            let time = parseInt(timeLabel.string);
            if(time > 0){
                timeLabel.string = --time + "";
            }else{
                Global.changeState(GameState.WAIT_RESULT);
                this.unschedule(callback);
            }
        };
        this.schedule(callback,1);
    }
}