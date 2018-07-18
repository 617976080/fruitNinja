import FruitStrategy from "./FruitStrategy";
import GameBaseAbstract from "./GameBaseAbstract";
import GameBaseFactory from "./GameBaseFactory";
import Fruit, {ThrowOrientation} from "./Fruit";

export default class FruitNativeStrategy extends FruitStrategy{
    constructor(fruit : Fruit){
        super(fruit);
    }
    setStartPosition(): void {
        const gameBase = GameBaseFactory.getGameBase();
        const winSize = gameBase.getWinSize();
        let x = winSize.width * 0.4 * Math.random() - winSize.width * 0.5;
        const y = - winSize.height * 0.2 * Math.random() - winSize.height * 0.5;
        if(this.fruit.throwOrientation){
            x = - x;
        }
        this.fruit.node.setPosition(x, y);
    }
    jumpAction() : cc.Action{
        let gameBase = GameBaseFactory.getGameBase();
        let winSize = gameBase.getWinSize();
        let destination : cc.Vec2 = (() => {
            let x = winSize.width * 0.25 + winSize.width * 0.5 * Math.random();
            let y =  - winSize.height * 0.25 - winSize.height * 0.5 * Math.random();
            if(this.fruit.throwOrientation == ThrowOrientation.ANTICLOCKWISE){
                x = -x;
            }
            return cc.p(Math.round(x), Math.round(y));
        })();

        let jumpHeight = Math.round(winSize.height * 0.6 + winSize.height * 0.3 * Math.random());
        let jumpAction = cc.jumpTo(this.getJumpDuration(), destination, jumpHeight, 1);
        let callback = cc.callFunc(() =>{
            let node = this.fruit.node;
            if(this.fruit.fruitType != "boom"){
                gameBase.miss();
            }
            let scheduler = () => {
                node.removeFromParent();
                cc.director.getScheduler().unschedule(scheduler, node);
            };
            cc.director.getScheduler().schedule(scheduler, node, 0.1);
        });
        return cc.sequence(jumpAction, callback);
    }

}