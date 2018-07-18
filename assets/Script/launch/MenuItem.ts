import Config from "../global/Config";
import Global from "../global/Global";
enum RotateOrientation{
    CLOCKWISE,
    ANTICLOCKWISE
}
const {ccclass, property} = cc._decorator;
@ccclass
export default class MenuItem extends cc.Component{
    private static rotation = 360;
    private static duration = 1;
    @property({
        type : cc.Enum(RotateOrientation),
        default : RotateOrientation.CLOCKWISE
    })
    private rotateOrientation : RotateOrientation;

    @property({
        type : cc.Component.EventHandler,
        default : null
    })
    private touchEvent : cc.Component.EventHandler;
    public onLoad(){
        const node = this.node;
        const rotation = this.rotateOrientation == RotateOrientation.CLOCKWISE ? MenuItem.rotation : - MenuItem.rotation;
        node.runAction(cc.repeatForever(cc.rotateBy(MenuItem.duration, rotation)));
        let callback = (event) => {
            if(cc.pDistance(event.getStartLocation(), event.getLocation()) > Config.inciseLimit){
                return;
            }
            node.off("touchmove", callback, this);
            //node.addChild(Global.createFlash(), 0);
            this.touchEvent.emit(null);
        };
        node.on("touchmove", callback, this);
    }
}