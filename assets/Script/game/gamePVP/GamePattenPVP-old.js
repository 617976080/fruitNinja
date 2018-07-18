// /**
//  * Created by xushaojun on 17/3/16.
//  */
// var GamePattenAbstract = require('GamePattenAbstract');
// var link;
// var socket;
// var Global = require("Global");
// var game;
// var gamePVP;
// var addTouchMoveListen = {
//     throwUser : function(){
//
//     },
//     knifeUser : function(angle, touchPos){
//         // 遍历切割水果
//         var isIncised = false;
//         game.forEachFruit(function(fruit){
//             if(fruit.isSeparate){
//                 return;
//             }
//             if(game.isIncised(touchPos, fruit.getPosition())){
//                 var component = fruit.getComponent("Fruit");
//                 if(component.fruitName == 'boom'){
//                     socket.emit('over');
//                     console.log('waitResuit!');
//                     Global.publish('waitResult');
//                 }
//                 component.separate(angle);
//                 isIncised = true;
//             }
//         });
//         if(isIncised){
//             socket.emit('updateScore', Global.getScore());
//         }
//     }
// };
// var createFruits = {
//     throwUser : function(){
//     },
//     knifeUser : function(){
//         socket.on('throw', function(x, angle, speed, isBoom, left){
//             console.log("Your enemy throw in (" + x + ',' + angle +"," + ",speed:" + speed + ")");
//             var fruitName = isBoom ? 'boom' : Global.getRandomFruitName(false);
//             var node = Global.getFromPool("fruit", fruitName, x, angle, speed);
//             gamePVP.getLeftProps().setCount(left.fruit, left.boom);
//             node.getComponent("Fruit").game = game;
//             game.addFruit(node);
//         });
//     }
// };
// var gameOver = {
//     throwUser : function(score){
//         return '你获得' + score +'分' ;
//     },
//     knifeUser : function(score){
//         return '你的对手获得' + score +'分' ;
//     }
// };
// module.exports = function(importGame){
//     game = importGame;
//     link = require('linkServer')(game);
//     socket = link.socket;
//     var launch = function(userCharacter, GamePVP){
//         gamePVP = GamePVP;
//         var leftProps = gamePVP.getLeftProps();
//         GamePattenAbstract({
//             addTouchMoveListen : addTouchMoveListen[userCharacter],
//             createFruits : createFruits[userCharacter],
//             listenGameOver : function(){}
//         },importGame, 'PVP');
//         var leftProp = gamePVP.getLeftProps();
//         // 其余操作
//         var actions = {
//             throwUser : function(){
//                 var startLocation;
//                 var throwType;
//                 var startTime = new Date().getTime();
//                 // 限制抛出水果的时间间隔
//                 var allowThrowLimit = (function(){
//                     var allowThrow = true;
//                     setTimeout(function(){
//                         allowThrow = true;
//                     }, 1000);
//                     return {
//                         check : function(){
//                             return allowThrow;
//                         },
//                         update : function(){
//                             allowThrow = false;
//                         }
//                     }
//                 })();
//
//                 // 检测是否为多点触摸
//                 var touchCheck = (function(){
//                     var isMultiplyTouch = false;
//                     return {
//                         update : function(event){
//                             if(isMultiplyTouch == true){
//                                 return;
//                             }
//                             isMultiplyTouch = event.getTouches().length > 1;
//                         },
//                         clear : function(){
//                             isMultiplyTouch = false;
//                         },
//                         check: function(){
//                             return isMultiplyTouch;
//                         }
//                     };
//                 })();
//                 // 监听抛出水果
//                 game.node.on("touchstart", function(event){
//                     startLocation = event.touch.getLocation();
//                     touchCheck.update(event);
//                 }.bind(this));
//
//
//                 game.node.on("touchmove", function(event){
//                     touchCheck.update(event);
//                 });
//
//                 var count = 0;
//                 var throwListen = game.node.on("touchend", function(event){
//                     var isMultiplyTouch = touchCheck.check();
//                     touchCheck.clear();
//                     if(!allowThrowLimit.check()){
//                         return;
//                     }
//                     var touch = event.touch;
//                     var location = touch.getLocation();
//                     var distance = cc.pDistance(startLocation, location);
//                     if(distance < 10){
//                         return;
//                     }
//                     var angle = cc.pToAngle(cc.pSub(location,startLocation));
//                     angle = Global.PVP.getAngle(angle);
//                     var x = game.node.convertToNodeSpaceAR(startLocation).x;
//                     var speed = (new Date().getTime() - startTime) / distance;
//                     speed = Global.PVP.getSpeed(speed);
//
//                     // 多点触摸,则投掷炸弹
//                     if(isMultiplyTouch){
//                         count++;
//                         if(count == 2){
//                             count = 0;
//                         }else{
//                             return;
//                         }
//                         if(!leftProps.updateBoomCount()){
//                             return;
//                         }
//                         socket.emit('throw',x, angle, speed, true, leftProp.getLeft());
//                         allowThrowLimit.update();
//                         return;
//                     }
//                     if(!leftProps.updateFruitCount()){
//                         return;
//                     }
//                     socket.emit('throw',x, angle, speed, false, leftProp.getLeft());
//                     allowThrowLimit.update();
//                 });
//
//
//                 Global.addListen('waitResult', function(){
//                     game.node.off('touchend', throwListen);
//                 });
//             },
//             knifeUser : function(){}
//         };
//
//         actions[userCharacter]();
//     };
//     // 初始化连接
//     link.init(launch);
// };