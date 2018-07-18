import GameBaseAbstract from "./GameBaseAbstract";
import Global from "../global/Global";
import Scheduler = cc.Scheduler;
export default class GameBaseNative extends GameBaseAbstract{
    private scheduler : Function;
    public constructor(){
        super();
    }
    protected addTouchListen(): void {
        this.fruitsNode.on("touchmove", this.onTouchMove);
    }
    protected handleKnifeFruits(angle: number, touchLocation: cc.Vec2): void {
        let Angle = angle;
        this.fruitsForeach((fruit) => {
            if(fruit.isSeparate() === true) return;
            if(this.isIncised(touchLocation, fruit.node.getPosition())){
                fruit.separate(Angle);
            }
        });
    }
    protected createFruits(): void {
        cc.director.getScheduler().schedule(this.scheduler = () => {
            this.addFruit(this.getFruit());
        }, this.node, this.getThrowInterval());
    }
}