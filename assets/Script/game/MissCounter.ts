// var Global = require('Global');
// var allowMiss = Global.allowMiss;
// cc.Class({
//     extends: cc.Component,
//
//     properties: {
//         normalIcon : cc.SpriteFrame,
//         missIcon : cc.SpriteFrame,
//         missed : 0
//     },
//     init : function(methad){
//         miss[methad](this);
//     }
// });
// var miss = {
//     single : function(instance){
//         var createIcon = function(){
//             var node = new cc.Node();
//             var sprite = node.addComponent(cc.Sprite);
//             sprite.spriteFrame = instance.normalIcon;
//             sprite.sizeMode = cc.Sprite.SizeMode.RAW;
//             instance.node.addChild(node);
//         };
//
//         for(let i = 0; i < allowMiss; i++){
//             createIcon();
//         }
//         var callback = function(){
//             var missIcon = instance.node.children[instance.missed];
//             if(instance.missed >= allowMiss){
//                 cc.log('gameOver');
//                 Global.publish("gameOver");
//                 Global.removeListen('miss', callback);
//                 return;
//             }
//             missIcon.getComponent(cc.Sprite).spriteFrame = instance.missIcon;
//             instance.missed++;
//         };
//         Global.addListen("miss", callback);
//     },
//     PVP : function(instance){
//         Global.addListen("miss", function(){
//             instance.missed += 1;
//         }.bind(this));
//     }
// };
import GameBaseFactory from "./GameBaseFactory";

const {ccclass, property} = cc._decorator;
@ccclass
export default class MissCounter extends cc.Component{
    @property({
        type : cc.SpriteFrame,
        default : null
    })
    private normalIcon : cc.SpriteFrame;

    @property({
        type : cc.SpriteFrame,
        default : null
    })
    private missIcon : cc.SpriteFrame;

    @property({
        type : cc.Integer,
        default : 0,
    })
    private allowMiss : number;

    private missed : number = 0;
    public start() : void{
        this.createIcons();
    }
    private createIcons() : void{
        for(let i = 0; i < this.allowMiss; i++){
            let node = new cc.Node();
            let sprite = node.addComponent(cc.Sprite);
            sprite.spriteFrame = this.normalIcon;
            sprite.sizeMode = cc.Sprite.SizeMode.RAW;
            this.node.addChild(node);
        }
    }
    public miss(){
        if(this.missed >= this.allowMiss){
            GameBaseFactory.getGameBase().gameOver();
            return;
        }
        const nextIcon = this.node.children[this.missed++];
        nextIcon.getComponent(cc.Sprite).spriteFrame = this.missIcon;
    }
}