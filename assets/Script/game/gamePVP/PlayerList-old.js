// var pool;
// var touchCallback;
// cc.Class({
//     extends: cc.Component,
//
//     properties: {
//         content : cc.Node,
//         playerNamePrefab : cc.Prefab
//     },
//     onLoad : function(){
//         pool = new cc.NodePool(cc.Node);
//     },
//     updateList : function(list){
//         // 清除所有子节点
//         this.content.children.forEach(function(item){
//             pool.put(item);
//         });
//         // 重新添加玩家
//         var node;
//         var item;
//         for(var i = 0, l = list.length; i < l; i++){
//             item = list[i];
//             if(!(node = pool.get())){
//                 node = cc.instantiate(this.playerNamePrefab);
//                 node.on('touchstart', function(){
//                     touchCallback.apply(null, [this.id]);
//                 }, node);
//             }
//             node.getComponent(cc.Label).string = item.name;
//             node.id = item.id;
//             this.content.addChild(node, 0);
//         }
//     },
//     listenTouchPlayer : function(callback){
//         touchCallback = callback;
//     }
// });
