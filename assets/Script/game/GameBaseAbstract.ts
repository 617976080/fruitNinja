import Global from "../global/Global";
import Fruit from "./Fruit";
import Size = cc.Size;
import Config from "../global/Config";
import MissCounter from "./MissCounter";
import ConnectStateLayer from "../Connect/ConnectStateLayer";
export enum GamePatten{
    NATIVE,
    PVP
}
export default abstract class GameBaseAbstract{
    private static missCounter : MissCounter;
    private static node : cc.Node;
    private static knife : cc.Node;
    private static fruitsNode : cc.Node;
    private static fruitRadius : number;
    private static instance : GameBaseAbstract;
    private static flashPrefab : cc.Prefab;
    private static fruitPrefab : cc.Prefab;
    private static stateLayer : ConnectStateLayer;

    private static throwAudio : string;
    private static boomAudio : string;
    private static splatterAudio : string;

    private static _isInit = false;
    private static component  : cc.Component;
    private isGameOver = false;
    private winSize : Size;

    private fruitsInPool : Fruit[] = [];
    public static init(missCounter : MissCounter,
                       node : cc.Node,
                       knife : cc.Node,
                       fruitsNode : cc.Node,
                       stateLayer : ConnectStateLayer,
                       scoreLabel : cc.Label,
                       fruitPrefab : cc.Prefab,
                       flashPrefab : cc.Prefab,
                       fruitSpriteAtlas : cc.SpriteAtlas,
                       //boomAudio : string,
                       splatterAudio : string,
                       component : cc.Component
    ){
        GameBaseAbstract.missCounter = missCounter;
        GameBaseAbstract.node = node;
        GameBaseAbstract.knife = knife;

        GameBaseAbstract.fruitsNode = fruitsNode;
        GameBaseAbstract.stateLayer = stateLayer;
        GameBaseAbstract.splatterAudio = splatterAudio;
        //GameBaseAbstract.boomAudio = boomAudio;

        // 设置得分节点
        Global.addScoreLabel(scoreLabel);
        GameBaseAbstract.fruitPrefab = fruitPrefab;
        GameBaseAbstract.flashPrefab = flashPrefab;
        GameBaseAbstract.fruitRadius = Config.fruitRadius;
        Fruit.init(fruitSpriteAtlas, GameBaseAbstract.flashPrefab);
        GameBaseAbstract.component = component;
        this._isInit = true;
    }
    public static isInit(){
        return this._isInit;
    }
    get missCounter() : MissCounter{
        return GameBaseAbstract.missCounter;
    }
    get node() : cc.Node{
        return GameBaseAbstract.node;
    }
    get knife() : cc.Node{
        return GameBaseAbstract.knife;
    }
    get fruitsNode() : cc.Node{
        return GameBaseAbstract.fruitsNode;
    }
    get stateLayer() : ConnectStateLayer{
        return GameBaseAbstract.stateLayer;
    }
    get component() : cc.Component{
        return GameBaseAbstract.component;
    }
    public constructor(){
        this.initialize();
        GameBaseAbstract.instance = this;
    }
    protected initialize() : void{
        //// 监听触摸事件
        this.addTouchListen();
        // 隐藏切割光效
        this.knife.active = false;
        // 创建水果
        this.createFruits();
    }
    protected abstract addTouchListen() : void;
    protected onTouchMove = (event : cc.Event.EventTouch) => {
        let touch : cc.Touch = event.getTouches()[0];
        // 显示切割光效
        this.knife.active = true;
        // 获得触摸坐标
        const touchPos = event.target.convertTouchToNodeSpaceAR(touch);
        // 设置切割光效的坐标. 坐标系不一样, 不能使用touchPos作为切割光效的坐标
        this.knife.setPosition(touchPos);
        // 遍历切割水果
        const angle = cc.pAngle(touch.getLocation(), event.getStartLocation());
        this.handleKnifeFruits(angle,touchPos);
    };
    protected abstract handleKnifeFruits(angle : number, touchLocation : cc.Vec2) : void;
    protected abstract createFruits() : void;
    protected isIncised(touchPos : cc.Vec2, fruitPos : cc.Vec2) : boolean{
        return cc.pDistance(touchPos, fruitPos) < GameBaseAbstract.fruitRadius;
    }
    protected addFruit(fruit : Fruit) : void{
        if(this.isGameOver) return;
        this.playThrow();
        GameBaseAbstract.fruitsNode.addChild(fruit.node);
    }
    private createFruit() : Fruit{
        return cc.instantiate(GameBaseAbstract.fruitPrefab).getComponent("Fruit");
    }
    public addScore() : void{
        if(this.isGameOver) return;
        Global.addScore();
    }
    public gameOver() : void{
        if(this.isGameOver) return;
        Global.gameOver();
        this.fruitsForeach((fruit) => {
            fruit.unscheduleAllCallbacks();
        });
        this.isGameOver = true;
        cc.director.loadScene("Launch");
    }
    public getWinSize() : Size{
        if(this.winSize) return this.winSize;
        return this.winSize = cc.director.getWinSize();
    }
    public miss() : void{
        this.missCounter.miss();
    }
    protected getThrowInterval() : number {
        return 0.5;
    }
    protected fruitsForeach(callF : (fruit : Fruit) => void){
        this.fruitsNode.children.forEach((node) => {
            const fruit : Fruit = node.getComponent("Fruit");
            callF(fruit);
        });
    }
    public putFruit(fruit : Fruit) : void{
        fruit.node.removeFromParent();
        this.fruitsInPool.push(fruit);
    }
    private getFruitFromPool() : Fruit{
        return this.fruitsInPool.shift();
    }
    protected getFruit() : Fruit{
        let fruit = this.getFruitFromPool();
        if(fruit == null) fruit = this.createFruit();
        fruit.init();
        return fruit;
    }
    protected playThrow() : void{
        //cc.audioEngine.play(GameBaseAbstract.throwAudio, false, 1);
    }
    public playBoom() : void{
        //cc.audioEngine.play(GameBaseAbstract.boomAudio, false, 1);
    }
    public playSplatter() : void{
        //cc.audioEngine.play(GameBaseAbstract.splatterAudio, false, 1);
    }
}