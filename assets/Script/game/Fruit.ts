import FruitStrategy from "./FruitStrategy";
import GameBaseAbstract from "./GameBaseAbstract";
import FruitNativeStrategy from "./FruitNativeStrategy";
import GameBaseFactory from "./GameBaseFactory";

export enum ThrowOrientation{
    CLOCKWISE,
    ANTICLOCKWISE
}

const FruitType = ["apple", "banana", "strawberry", "peach", "watermelon", "boom"];
const FRUIT_TYPE_COUNT = 6;
const {ccclass, property} = cc._decorator;
@ccclass
export default class Fruit extends cc.Component{
    get fruitType(): string {
        return this._fruitType;
    }
    private _isSeparate : boolean;
    private _throwOrientation : ThrowOrientation;
    private strategy : FruitStrategy;
    private _fruitType : string;
    private static fruitAtlas : cc.SpriteAtlas;
    private static flashPrefab : cc.Prefab;
    private static flashFadeInDuration = 0.1;
    private static flashShowDuration = 0.2;
    public static init(fruitAtlas : cc.SpriteAtlas, flash : cc.Prefab) : void{
        Fruit.fruitAtlas = fruitAtlas;
        Fruit.flashPrefab = flash;
    }
    public onLoad(){
    }
    public init() : void{
        // 清除子节点
        this.node.removeAllChildren();

        // 设置策略
        this.strategy = new FruitNativeStrategy(this);

        // 显示
        this.node.opacity = 255;
        // 重置切割状态
        this._isSeparate = false;
        // 重置水果名称
        this._throwOrientation = Math.random() > 0.5 ? ThrowOrientation.ANTICLOCKWISE : ThrowOrientation.CLOCKWISE;

        // 重置水果纹理
        this.initSpriteFrame();

        // 设置发射点
        this.setStartPosition();

        // 跳跃
        this.jump();
    }
    private static getRandomFruitType() : string{
        return FruitType[Math.floor(Math.random() * FRUIT_TYPE_COUNT)];
    }
    private static getSpriteFrame(fruitType : string) : cc.SpriteFrame{
        return Fruit.fruitAtlas.getSpriteFrame(fruitType);
    }
    private initSpriteFrame() : void{
        const sprite : cc.Sprite = this.node.getComponent(cc.Sprite);
        const fruitType = Fruit.getRandomFruitType();
        sprite.spriteFrame = Fruit.getSpriteFrame(fruitType);
        this._fruitType = fruitType;
    }
    public isSeparate() : boolean{
        return this._isSeparate;
    }
    private showFlash(rotation : number) : void{
        const node  = cc.instantiate(Fruit.flashPrefab);
        node.rotation = rotation;
        node.opacity = 0;
        node.runAction(cc.sequence(
            cc.fadeIn(Fruit.flashFadeInDuration),
            cc.delayTime(Fruit.flashShowDuration),
            cc.callFunc(() => {
                let callFn = () => {
                    node.removeFromParent();
                    cc.director.getScheduler().unschedule(callFn, node);
                };
                cc.director.getScheduler().schedule(() => {}, node, 0.05);
            })
        ));
        this.node.addChild(node);
    }
    public separate(angle : number) : void{
        const gameSystem = GameBaseFactory.getGameBase();
        if(this._fruitType == "boom"){
            gameSystem.gameOver();
            return;
        }
        const rotation = angle * 57.29;
        // 停止旋转和抛出的动作
        this.node.stopAllActions();

        // 显示切割光效
        this.showFlash(rotation);

        // 通知系统增加得分
        gameSystem.addScore();

        // 播放音效
        this.playEffect();

        // 清空纹理
        this.node.getComponent(cc.Sprite).spriteFrame = null;

        // 定时移除当前节点
        this.scheduleOnce(() => {
            gameSystem.putFruit(this);
        },Fruit.flashFadeInDuration + Fruit.flashShowDuration);

        // 设置当前节点属性为已经切割
        this._isSeparate = true;
    }
    private setStartPosition() : void{
        this.strategy.setStartPosition();
    }
    private jump() : void{
        this.node.runAction(this.strategy.jumpAction());
    }
    get throwOrientation(): ThrowOrientation {
        return this._throwOrientation;
    }
    private playEffect() : void{
        const gameSystem = GameBaseFactory.getGameBase();
        if(this._fruitType == "boom"){
            gameSystem.playBoom();
        }else{
            gameSystem.playSplatter();
        }
    }
}