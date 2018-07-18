import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import {PlayerListItem} from "./ClientAndServerConfig";
@ccclass
export default class PlayerList extends cc.Component{
    @property({
        type : cc.Node,
        default : null
    })
    private contentNode : cc.Node;

    @property({
        type : cc.Prefab,
        default : null
    })
    private playerNamePrefab : cc.Prefab;

    private pool : cc.NodePool;

    private onTouch : Function;
    public onLoad() : void{
        this.pool = new cc.NodePool();
    }
    public load(list : PlayerListItem[]) : void{
        this.node.active = true;
        // 清除所有子节点
        this.contentNode.children.forEach((item) => {
            this.pool.put(item);
        });
        // 重新添加玩家
        list.forEach((item) => {
            let node = this.pool.get();
            if(node === null){
                node = cc.instantiate(this.playerNamePrefab);
                node.on('touchstart', () => {
                    this.onTouch.apply(null, [item.id]);
                }, node);
            }
            node.getComponent(cc.Label).string = item.playerName;
            this.contentNode.addChild(node, 0, item.id);
        });
    }
    public setOnTouch(callFn : Function){
        this.onTouch = callFn;
    }

}