// /**
//  * Created by xushaojun on 17/3/16.
//  */
// var Global = require('Global');
// module.exports = function(param, game, method){
//     var addTouchMoveListen;
//     if(param.addTouchMoveListen){
//         addTouchMoveListen = function(){
//             // 触摸移动事件
//             var count = 0;
//             var location = null;
//             var callback = function(event){
//                 var touch = event.touch;
//                 count++;
//                 if(count == 10){
//                     count = 0;
//                     location = touch.getLocation();
//                 }
//                 // 显示切割光效
//                 game.knife.active = true;
//                 // 获得触摸坐标
//                 var touchPos = game.node.convertTouchToNodeSpaceAR(event);
//                 // 设置切割光效的坐标. 坐标系不一样, 不能使用touchPos作为切割光效的坐标
//                 game.knife.setPosition(game.node.convertTouchToNodeSpace(event));
//                 // 遍历切割水果
//                 var angle = (function(){
//                     if(!location){
//                         return 0;
//                     }
//                     return cc.pToAngle(touch.getLocation(), location);
//                 })();
//                 param.addTouchMoveListen(angle,touchPos);
//             };
//             game.node.on("touchstart", callback);
//             game.node.on("touchmove", callback);
//         }
//     }else{
//         addTouchMoveListen = function(){
//             throw new Error("Please define method addTouchEndListen");
//         };
//     }
//
//     var addTouchEndListen;
//     if(param.addTouchEndListen){
//         addTouchEndListen = function(){
//             game.node.on("touchend", param.addTouchEndListen);
//         }
//     }else{
//         addTouchEndListen = function(){
//             // 触摸结束, 隐藏切割光效
//             game.node.on("touchend", function(){
//                 game.knife.active = false;
//             }.bind(this));
//         };
//     }
//     var listenGameOver;
//     if(param.listenGameOver){
//         listenGameOver = function(){
//             Global.addListen("gameOver", param.listenGameOver);
//         }
//     }else{
//         listenGameOver = function(){
//             throw new Error("Please define method listenGameOver");
//         };
//     }
//
//     var createFruits = param.createFruits || function(){
//             throw new Error("Please define method createFruits");
//         };
//
//     game.missMassage.getComponent('missMassage').init(method);
//         addTouchMoveListen();
//         listenGameOver();
//         addTouchEndListen();
//         createFruits();
// };