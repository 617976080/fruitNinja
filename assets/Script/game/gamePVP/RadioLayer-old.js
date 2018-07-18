// cc.Class({
//     extends: cc.Component,
//
//     properties: {
//         buttonPrefab : cc.Prefab,
//         massage : cc.Label,
//         buttons : cc.Node
//     },
//     onLoad : function(){
//         this.node.active = false;
//     },
//     radio : function(massage, buttons) {
//         this.node.active = true;
//         this.massage.string = massage;
//         this.buttons.removeAllChildren(true);
//
//         var self = this;
//         buttons.forEach(function (button) {
//             var node = cc.instantiate(self.buttonPrefab);
//             node.children[0].getComponent(cc.Label).string = button.string;
//             node.on('touchstart', function(){
//                 button.callback.apply(null);
//                 self.node.active = false;
//             });
//             self.buttons.addChild(node, 0);
//         });
//     },
//     confirm : function(massage, confirmString, callback){
//         var string = confirmString || '确认';
//         this.radio(massage, [{string : string, callback : callback || function(){}}]);
//     }
// });
