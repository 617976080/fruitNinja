import property = cc._decorator.property;
import ccclass = cc._decorator.ccclass;
import {MatchMethod} from "./ClientAndServerConfig";
@ccclass
export default class LinkLayer extends cc.Component{
    @property({
        type : cc.EditBox,
        default : null
    })
    editBox : cc.EditBox;

    @property({
        type : cc.Node,
        default : null
    })
    systemMatch : cc.Node;

    @property({
        type : cc.Node,
        default : null
    })
    freeMatch : cc.Node;
    public onLoad() : void{

    }
    public initialize(callBack : Function){
        this.editBox.string = cc.sys.localStorage.getItem('playerName') || "";
        this.listenTouch(MatchMethod.FREE_MATCH, this.freeMatch, callBack);
        this.listenTouch(MatchMethod.SYSTEM_MATCH, this.systemMatch, callBack);
    }
    private storeName() : void{
        cc.sys.localStorage.setItem('playerName', this.editBox.string);
    }
    private listenTouch(matchMethod : MatchMethod, node : cc.Node, callback : Function) :void{
        let callFn = () => {
            this.storeName();
            callback.call(null, this.editBox.string, matchMethod);
            node.off('touchstart', callFn);
        };
        node.on("touchstart", callFn);
    }
}