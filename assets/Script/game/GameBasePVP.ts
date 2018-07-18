import GameBaseAbstract from "./GameBaseAbstract";
import GameConnect from "./gamePVP/GameConnect";
import {GameData} from "../Connect/ClientAndServerConfig";
import Global from "../global/Global";

export default class GameBasePVP extends GameBaseAbstract{
    private gameConnect : GameConnect;
    private gameData : GameData;
    public constructor(){
        super();
        this.gameConnect = new GameConnect();
        this.gameData = Global.getGameData();
    }
    protected initialize(): void {
        let time = 0;
        this.component.scheduleOnce(() => {
            if(time++ === 3){
                super.initialize();
                return;
            }
            this.stateLayer.changeState('开始');
            this.stateLayer.node.active = false;
        }, 1);
    }
    protected addTouchListen(): void {
        this.node.on("touchstart", () => this.onTouchMove);
    }
    protected createFruits(): void {
        this.gameConnect.listenThrow((x : number, angle : number, speed : number, isBoom : boolean, left : number) => {
            this.addFruit(this.createFruit());
            //         socket.on('throw', function(x, angle, speed, isBoom, left){
//             console.log("Your enemy throw in (" + x + ',' + angle +"," + ",speed:" + speed + ")");
//             var fruitName = isBoom ? 'boom' : Global.getRandomFruitName(false);
//             var node = Global.getFromPool("fruit", fruitName, x, angle, speed);
//             gamePVP.getLeftProps().setCount(left.fruit, left.boom);
//             node.getComponent("Fruit").game = game;
//             game.addFruit(node);
        });
    }

}