import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import GameBaseAbstract from "./GameBaseAbstract";
import GameBaseFactory from "./GameBaseFactory";
import MissCounter from "./MissCounter";
import Global from "../global/Global";
import ConnectStateLayer from "../Connect/ConnectStateLayer";
@ccclass
export default class GameComponent extends cc.Component{
    @property({
        type : MissCounter,
        default : null
    })
    private  missCounter : MissCounter;

    @property({
        type : cc.Node,
        default : null
    })
    private  knife : cc.Node;

    @property({
        type : cc.Label,
        default : null
    })
    private  scoreLabel : cc.Label;

    @property({
        type : cc.Prefab,
        default : null
    })
    private  flashPrefab : cc.Prefab;

    @property({
        type : cc.Prefab,
        default : null
    })
    private  fruitPrefab : cc.Prefab;

    @property({
        type : cc.SpriteAtlas,
        default : null
    })
    private fruitSpriteAtlas : cc.SpriteAtlas;

    @property({
        type : cc.Node,
        default : null
    })
    private fruitsNode : cc.Node;

    @property({
        type : ConnectStateLayer,
        default : null
    })
    private stateLayer : ConnectStateLayer;

    @property({
        url : cc.AudioClip,
        default : null
    })
    private throwAudio : cc.AudioClip;

    @property({
        url : cc.AudioClip,
        default : null
    })
    private boomAudio : cc.AudioClip;
    
    @property({
        url : cc.AudioClip,
        default : null
    })
    private splatterAudio : cc.AudioClip;

    onLoad() : void{
        GameBaseAbstract.init(
            this.missCounter,
            this.node,
            this.knife,
            this.fruitsNode,
            this.stateLayer,
            this.scoreLabel,
            this.fruitPrefab,
            this.flashPrefab,
            this.fruitSpriteAtlas,
            this.splatterAudio,
            this
        );
        const game = GameBaseFactory.createGameBase(Global.getGamePatten());
    }
}