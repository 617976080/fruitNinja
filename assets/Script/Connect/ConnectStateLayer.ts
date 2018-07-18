// cc.Class({
//     extends: cc.Component,
//
//     properties: {
//         label : cc.Label
//     },
//     setString : function(string, callback, delayTime){
//         var self = this;
//         delayTime = delayTime || 1000;
//         this.node.active = true;
//         this.label.string = string;
//         if(typeof callback == 'function'){
//             setTimeout(function(){
//                 callback();
//                 self.node.active = false;
//             }, delayTime);
//         }
//     }
// });
import property = cc._decorator.property;
import ccclass = cc._decorator.ccclass;
@ccclass
export default class ConnectStateLayer extends cc.Component{
    @property({
        type : cc.Label,
        default : null
    })
    private label : cc.Label;
    public onLoad() : void{
    }
    public changeState(text : string, callback? : Function, delayTime = 1) : void{
        this.node.active = true;
        this.label.string = text;
        this.scheduleOnce(() => {
            if(callback) callback();
            this.node.active = false;
        },delayTime);
    }
}